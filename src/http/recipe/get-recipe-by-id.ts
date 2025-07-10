import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function getRecipeById(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/recipe/:id",
			{
				schema: {
					tags: ["Recipe"],
					summary: "Get a recipe by id",
					params: z.object({
						id: z.string(),
					}),
					response: {
						200: z.object({
							id: z.string(),
							name: z.string(),
							description: z.string().nullable(),
							imageUrl: z.string().nullable(),
							ingredients: z.array(z.string()),
							steps: z.array(z.string()),
							createdAt: z.date(),
							updatedAt: z.date(),
						}),
					},
				},
			},
			async (request, reply) => {
				const recipe = await prisma.recipe.findUnique({
					where: {
						id: request.params.id,
					},
				});

				if (!recipe) {
					throw new NotFoundError("Receita não encontrada");
				}

				return reply.status(200).send(recipe);
			},
		);
}
