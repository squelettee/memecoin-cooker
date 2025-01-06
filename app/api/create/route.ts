import { PrismaClient } from '@prisma/client';
import { templateSchema } from "@/validations/template-schema"

const prisma = new PrismaClient();

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), { status: 405 });
  }

  try {
    const requestData = await request.json();
    const parsedData = templateSchema.parse(requestData);

    // Ensure all required fields have values
    const templateData = {
      status: parsedData.status,
      domain: parsedData.domain,
      packType: parsedData.packType,
      tokenName: parsedData.tokenName,
      tokenSymbol: parsedData.tokenSymbol,
      contractAddress: parsedData.contractAddress,
      blockchain: parsedData.blockchain,
      launchDate: parsedData.launchDate,
      imageUrl: parsedData.imageUrl || '',
      description: parsedData.description || '',
      telegram: parsedData.telegram || '',
      twitter: parsedData.twitter || '',
      dexscreener: parsedData.dexscreener || '',
      aiPrompt: parsedData.aiPrompt,
      aiEnabled: parsedData.aiEnabled,
      aiLanguages: parsedData.aiLanguages
    };

    const newTemplate = await prisma.template.create({
      data: templateData,
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
