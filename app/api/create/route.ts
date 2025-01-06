import { PrismaClient } from '@prisma/client';
import { templateSchema } from "@/validations/template-schema"

const prisma = new PrismaClient();

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), { status: 405 });
  }

  try {
    console.log(request)
    const requestData = await request.json();
    const parsedData = templateSchema.parse(requestData);


    const newTemplate = await prisma.template.create({
      data: {
        ...parsedData,
        tokenName: parsedData.tokenName || null,
        tokenSymbol: parsedData.tokenSymbol || null,
        contractAddress: parsedData.contractAddress || null,
        blockchain: parsedData.blockchain || null,
        launchDate: parsedData.launchDate || null,
        imageUrl: parsedData.imageUrl || null,
        description: parsedData.description || null,
        telegram: parsedData.telegram || null,
        twitter: parsedData.twitter || null,
        dexscreener: parsedData.dexscreener || null,
        aiPrompt: parsedData.aiPrompt || null,
      },
    });

    return new Response(JSON.stringify(newTemplate), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return new Response(JSON.stringify({ error: 'Invalid input data.', details: error.message }), { status: 400 });
    }
    console.error('Erreur lors de la création du template:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur.' }), { status: 500 });
  }
}
