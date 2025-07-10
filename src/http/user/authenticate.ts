import { compare } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequestError } from "../_errors/bad-request";

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
				throw new BadRequestError("Usuário com o mesmo e-mail não existe.");
			}

			const isPasswordValid = await compare(
				password,
				userFromEmail.passwordHash,
			);

			if (!isPasswordValid) {
				throw new BadRequestError("Senha inválida.");
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
