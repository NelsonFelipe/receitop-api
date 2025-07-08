import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { auth } from "../middlewares/auth";

export async function getRecipe(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get("/recipe", {
        schema: {
            tags: ["Recipe"],
            summary: "Get all recipes",
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    description: z.string(),
                    imageUrl: z.string(),
                    ingredients: z.array(z.string()),
                    steps: z.array(z.string()),
                    createdAt: z.string(),
                    updatedAt: z.string(),
                }))
            }
        }
    },
    async (_, reply) => {

    const recipes = await prisma.recipe.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return reply.status(200).send(recipes);
})
}