import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../_errors/not-found-error";
import { auth } from "../middlewares/auth";

export async function profile(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().register(auth).get(
		"/profile",
		{
			schema: {
				tags: ["Auth"],
				summary: "Get user profile",
				response: {
					201: z.object({
						user: z.object({
							id: z.string(),
							name: z.string(),
							email: z.string(),
						}),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const user = await prisma.user.findUnique({
				where: {
					id: request.user.sub,
				},
			});

			if (!user) {
				throw new NotFoundError("User with same e-mail does not exist")
			}

			return reply.status(201).send({
				user,
			});
		},
	);
}
