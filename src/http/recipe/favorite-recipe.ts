import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function favoriteRecipe(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			"/recipe/:id/favorite",
			{
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
						}),
					},
				},
			},
			async (request, reply) => {
				const { id } = request.params;
				const userId = await request.getCurrentUserId();

				const recipe = await prisma.recipe.findUnique({
					where: { id },
				});

				if (!recipe) {
					throw new NotFoundError("Receita não encontrada");
				}

				await prisma.favorite.create({
					data: {
						userId,
						recipeId: id,
					},
				});

				return reply
					.status(200)
					.send({ message: "Receita favoritada com sucesso" });
			},
		);
}
