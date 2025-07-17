import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const recipes = [
		{
			name: "Bolo de Cenoura",
			description: "Um bolo fofinho e delicioso com cobertura de chocolate.",
			imageUrl:
				"https://assets.unileversolutions.com/recipes-v3/67405-default.jpg?im=AspectCrop=(625,469);Resize=(625,469)",
			ingredients: [
				"3 cenouras médias",
				"4 ovos",
				"1 xícara de óleo",
				"2 xícaras de açúcar",
				"2 e 1/2 xícaras de farinha de trigo",
				"1 colher de sopa de fermento em pó",
			],
			steps: [
				"Preaqueça o forno a 180°C.",
				"Bata no liquidificador as cenouras, ovos e óleo.",
				"Adicione o açúcar e bata novamente.",
				"Transfira para uma tigela e misture a farinha e o fermento.",
				"Despeje em uma forma untada e asse por 40 minutos.",
			],
		},
		{
			name: "Panqueca de Frango",
			description:
				"Panquecas recheadas com frango desfiado ao molho de tomate.",
			imageUrl:
				"https://i0.wp.com/areademulher.r7.com/wp-content/uploads/2022/04/panqueca-de-frango-desfiado.jpg?w=1200&ssl=1",
			ingredients: [
				"1 xícara de leite",
				"1 ovo",
				"1 xícara de farinha de trigo",
				"1 colher de sopa de óleo",
				"Sal a gosto",
				"Frango cozido e desfiado",
				"Molho de tomate",
			],
			steps: [
				"Bata no liquidificador o leite, ovo, farinha, óleo e sal.",
				"Aqueça uma frigideira e faça as panquecas.",
				"Recheie com o frango desfiado.",
				"Enrole, cubra com molho e leve ao forno para gratinar.",
			],
		},
		{
			name: "Pizza de Calabresa",
			description: "Pizza de calabresa com cebola e azeitonas.",
			imageUrl:
				"https://swiftbr.vteximg.com.br/arquivos/ids/208740-636-636/618283-pizza-artesanal-calabresa_inn.jpg?v=638870725352100000",
			ingredients: [
				"1 xícara de leite",
				"1 ovo",
				"1 xícara de farinha de trigo",
				"1 colher de sopa de óleo",
				"Sal a gosto",
				"Calabresa",
				"Cebola",
				"Azeitonas",
			],
			steps: [
				"Bata no liquidificador o leite, ovo, farinha, óleo e sal.",
				"Aqueça uma frigideira e faça as panquecas.",
				"Recheie com o frango desfiado.",
				"Enrole, cubra com molho e leve ao forno para gratinar.",
			],
		},
		{
			name: "Escondidinho de Carne Seca",
			description:
				"Purê de mandioca com recheio cremoso de carne seca desfiada.",
			imageUrl:
				"https://sabores-new.s3.amazonaws.com/public/2024/11/escondidinho-com-carne-seca-1024x494.webp",
			ingredients: [
				"500g de carne seca desfiada",
				"1kg de mandioca cozida",
				"1/2 xícara de leite",
				"2 colheres de sopa de manteiga",
				"1 cebola picada",
				"Sal a gosto",
				"Queijo ralado para gratinar",
			],
			steps: [
				"Cozinhe a mandioca e amasse com leite e manteiga até virar um purê.",
				"Refogue a carne seca com cebola e ajuste o sal.",
				"Em um refratário, faça uma camada de purê, uma de carne e finalize com mais purê.",
				"Cubra com queijo e leve ao forno para gratinar.",
			],
		},
		{
			name: "Salada Caesar",
			description:
				"Clássica salada Caesar com molho cremoso e croutons crocantes.",
			imageUrl:
				"https://minhasreceitinhas.com.br/wp-content/uploads/2025/03/salada-caesar-para-4-pessoas-730x365.jpg",
			ingredients: [
				"Alface romana",
				"Croutons",
				"Parmesão ralado",
				"Peito de frango grelhado",
				"Molho Caesar",
			],
			steps: [
				"Rasgue as folhas de alface e coloque em uma tigela.",
				"Adicione o frango grelhado fatiado, croutons e parmesão.",
				"Regue com molho Caesar e misture bem antes de servir.",
			],
		},
		{
			name: "Brownie de Chocolate",
			description: "Brownie úmido e chocolatudo com casquinha crocante.",
			imageUrl:
				"https://www.receitasnestle.com.br/sites/default/files/srh_recipes/a400ee35c080a42937396b89567f229f.jpg",
			ingredients: [
				"200g de chocolate meio amargo",
				"100g de manteiga",
				"1 xícara de açúcar",
				"2 ovos",
				"1/2 xícara de farinha de trigo",
				"1 pitada de sal",
			],
			steps: [
				"Derreta o chocolate com a manteiga em banho-maria.",
				"Adicione o açúcar e os ovos, mexendo bem.",
				"Incorpore a farinha e o sal.",
				"Despeje em uma forma e asse a 180°C por 25-30 minutos.",
			],
		},
	];

	for (const recipe of recipes) {
		await prisma.recipe.create({
			data: recipe,
		});
	}

	console.log("Seed realizado com sucesso!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
