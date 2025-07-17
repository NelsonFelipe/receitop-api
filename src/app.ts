import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./http/_errors/error-handler";
import { createRecipe } from "./http/recipe/create-recipe";
import { deleteRecipe } from "./http/recipe/delete-recipe";
import { favoriteRecipe } from "./http/recipe/favorite-recipe";
import { getFavoriteRecipe } from "./http/recipe/get-favorite-recipe";
import { getRecipe } from "./http/recipe/get-recipe";
import { getRecipeById } from "./http/recipe/get-recipe-by-id";
import { unfavoriteRecipe } from "./http/recipe/unfavorite-recipe";
import { authenticate } from "./http/user/authenticate";
import { createAccount } from "./http/user/create-account";
import { getProfile } from "./http/user/profile";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

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
	secret: "jwt-secret",
});

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(createAccount);
app.register(authenticate);
app.register(getProfile);
app.register(createRecipe);
app.register(getRecipe);
app.register(getRecipeById);
app.register(favoriteRecipe);
app.register(unfavoriteRecipe);
app.register(getFavoriteRecipe);
app.register(deleteRecipe);
