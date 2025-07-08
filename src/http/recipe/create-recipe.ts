import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { auth } from "../middlewares/auth";
import { prisma } from "../../lib/prisma";

export async function createRecipe(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).post("/recipe", {
        schema: {
            tags: ["Recipe"],
            summary: "Create a new recipe",
            body: z.object({
                name: z.string(),
                description: z.string(),
                imageUrl: z.string().optional(),
                ingredients: z.array(z.string()),
                steps: z.array(z.string()),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                }),
                400: z.object({
                    message: z.string(),
                })
            }
        }
    },
    async (request, reply) => {
        const { name, description, ingredients, steps, imageUrl } = request.body;

        await prisma.recipe.create({
            data: { 
                name,
                description,
                imageUrl,
                ingredients,
                steps,
             },
        });

        return reply.status(201).send({message: "Recipe created successfully"});
    }
)
}