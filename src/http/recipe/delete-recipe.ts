import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function deleteRecipe(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.delete(
			"/recipe/:id",
			{
				schema: {
					tags: ["Recipe"],
					summary: "Delete a recipe by id",
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
				const recipe = await prisma.recipe.delete({
					where: {
						id: request.params.id,
					},
				});

				if (!recipe) {
					throw new NotFoundError("Receita não encontrada");
				}

				return reply
					.status(200)
					.send({ message: "Receita deletada com sucesso" });
			},
		);
}
