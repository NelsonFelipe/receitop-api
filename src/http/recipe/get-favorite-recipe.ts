import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { auth } from "../middlewares/auth";

export async function getFavoriteRecipe(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/favorite-recipe",
			{
				schema: {
					tags: ["Recipe"],
					summary: "Get all favorite recipes",
					response: {
						200: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								description: z.string().nullable(),
								imageUrl: z.string().nullable(),
								ingredients: z.array(z.string()),
								steps: z.array(z.string()),
								createdAt: z.date(),
								updatedAt: z.date(),
							}),
						),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId();
				const recipes = await prisma.recipe.findMany({
					where: {
						favorites: {
							some: {
								userId,
							},
						},
					},
					orderBy: {
						createdAt: "desc",
					},
				});

				return reply.status(200).send(recipes);
			},
		);
}
