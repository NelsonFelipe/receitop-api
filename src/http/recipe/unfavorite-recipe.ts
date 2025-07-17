import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function unfavoriteRecipe(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			"/recipe/:id/unfavorite",
			{
				schema: {
					tags: ["Recipe"],
					summary: "Unfavorite a recipe",
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

				const favorite = await prisma.favorite.findUnique({
					where: {
						userId_recipeId: {
							userId,
							recipeId: id,
						},
					},
				});

				if (!favorite) {
					return reply
						.status(404)
						.send({ message: "Receita não está favoritada" });
				}

				await prisma.favorite.delete({
					where: {
						userId_recipeId: {
							userId,
							recipeId: id,
						},
					},
				});

				return reply
					.status(200)
					.send({ message: "Receita desfavoritada com sucesso" });
			},
		);
}
