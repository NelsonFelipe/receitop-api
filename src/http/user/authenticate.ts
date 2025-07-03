import { compare } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const authenticateWithPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export async function authenticate(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/sessions",
		{
			schema: {
				tags: ["Auth"],
				summary: "Authenticate user",
				body: authenticateWithPasswordSchema,
				response: {
					201: z.object({
						token: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body;

			const userFromEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!userFromEmail) {
				return reply
					.status(400)
					.send({ message: "User with same e-mail does not exist." });
			}

			const isPasswordValid = await compare(
				password,
				userFromEmail.passwordHash,
			);

			if (!isPasswordValid) {
				return reply.status(400).send({ message: "Invalid password." });
			}

			const token = await reply.jwtSign(
				{
					sub: userFromEmail.id,
				},
				{
					sign: {
						expiresIn: "7d",
					},
				},
			);

			return reply.status(201).send({
				token,
			});
		},
	);
}
