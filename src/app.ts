import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./lib/env";
import { createAccount } from "./http/user/create-account";
import { authenticate } from "./http/user/authenticate";
import { profile } from "./http/user/profile";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Receitop API",
			description: "API para gerenciamento de receitas",
			version: "1.0.0",
		},
		servers: [],
	},
	transform: jsonSchemaTransform,
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/documentation",
});

app.register(createAccount);
app.register(authenticate);
app.register(profile);
