import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function getProfile(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/profile",
			{
				schema: {
					tags: ["Auth"],
					summary: "Get authenticated user profile",
					response: {
						200: z.object({
							user: z.object({
								id: z.string(),
								name: z.string(),
								email: z.string().email(),
							}),
						}),
					},
				},
			},
			async (request, reply) => {
				const userId = await request.getCurrentUserId();

				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});

				if (!user) {
					throw new NotFoundError("Usuário não encontrado.");
				}

				return reply.status(200).send({
					user,
				});
			},
		);
}
