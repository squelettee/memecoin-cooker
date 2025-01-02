import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers templates:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
