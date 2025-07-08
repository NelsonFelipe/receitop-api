import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { auth } from "../middlewares/auth";
import { NotFoundError } from "../_errors/not-found-error";
import { prisma } from "../../lib/prisma";

export async function favoriteRecipe(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).post("/recipe/:id/favorite", {
        schema: {
            tags: ["Recipe"],
            summary: "Favorite a recipe",
            params: z.object({
                id: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                }),
                404: z.object({
                    message: z.string(),
                })
            }
        }
    },
    async (request, reply) => {
        const { id } = request.params;

        const recipe = await prisma.recipe.findUnique({
            where: { id },
        });

        if (!recipe) {
            throw new NotFoundError("Recipe not found");
        }

        await prisma.favorite.create({
            data: {
                userId: request.user.sub,
                recipeId: id,
            },
        });

        return reply.status(200).send({ message: "Recipe favorited successfully" });
    }
)
}