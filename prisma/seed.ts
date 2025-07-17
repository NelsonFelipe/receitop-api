import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.recipe.deleteMany();

	const recipes = [
		{
			name: "Lasanha à Bolonhesa",
			description:
				"Camadas de massa intercaladas com molho bolonhesa e queijo.",
			imageUrl:
				"https://guiadacozinha.com.br/wp-content/uploads/2019/10/lasanha-bolonhesa.jpg",
			ingredients: [
				"Massa para lasanha",
				"500g de carne moída",
				"1 cebola picada",
				"2 dentes de alho picados",
				"Molho de tomate",
				"Queijo mussarela",
				"Presunto",
				"Sal e temperos a gosto",
			],
			steps: [
				"Refogue a carne moída com alho e cebola.",
				"Adicione o molho de tomate e tempere.",
				"Em um refratário, monte camadas de molho, massa, presunto e queijo.",
				"Finalize com queijo por cima e leve ao forno para assar por 30 minutos.",
			],
		},
		{
			name: "Cuscuz Nordestino",
			description:
				"Prato típico feito com flocos de milho cozidos no vapor, simples e delicioso.",
			imageUrl:
				"https://www.minhareceita.com.br/app/uploads/2025/05/cuscuz-nordestino-portal-minha-receita.webp",
			ingredients: [
				"2 xícaras de flocão de milho",
				"1 xícara de água",
				"Sal a gosto",
				"Manteiga ou margarina",
			],
			steps: [
				"Em uma tigela, misture o flocão, água e sal. Deixe hidratar por 10 minutos.",
				"Coloque a massa em uma cuscuzeira e leve ao fogo por cerca de 15 minutos.",
				"Desenforme e sirva com manteiga derretida ou acompanhamento a gosto.",
			],
		},
		{
			name: "Omelete de Legumes",
			description: "Omelete leve e nutritiva com legumes variados.",
			imageUrl:
				"https://guiadacozinha.com.br/wp-content/uploads/2019/10/omelete-de-legumes.jpg",
			ingredients: [
				"2 ovos",
				"1/2 cenoura ralada",
				"1/2 tomate picado",
				"1/4 de cebola picada",
				"Sal e pimenta a gosto",
				"Cheiro-verde",
				"Azeite para untar",
			],
			steps: [
				"Bata os ovos com sal, pimenta e cheiro-verde.",
				"Misture os legumes.",
				"Aqueça uma frigideira untada e despeje a mistura.",
				"Cozinhe dos dois lados até dourar.",
			],
		},
		{
			name: "Moqueca de Peixe",
			description:
				"Peixe cozido com leite de coco, pimentões e dendê. Clássico da culinária brasileira.",
			imageUrl:
				"https://painacozinha.com/wp-content/uploads/67.Moqueca-de-Peixe.webp",
			ingredients: [
				"800g de filé de peixe (cação ou robalo)",
				"1 limão",
				"1 cebola fatiada",
				"1 tomate fatiado",
				"1 pimentão fatiado",
				"200ml de leite de coco",
				"Azeite de dendê",
				"Coentro",
				"Sal e pimenta a gosto",
			],
			steps: [
				"Tempere o peixe com sal, pimenta e limão. Deixe marinar.",
				"Em uma panela, alterne camadas de cebola, tomate, pimentão e peixe.",
				"Regue com leite de coco e azeite de dendê.",
				"Cozinhe em fogo baixo por 20 minutos, finalize com coentro e sirva.",
			],
		},
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
