import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { error: 'Le paramètre domain est requis' },
      { status: 400 }
    );
  }

  try {
    const existingDomain = await prisma.template.findUnique({
      where: { domain: domain }
    });

    const isAvailable = !existingDomain;

    if (isAvailable) {
      return NextResponse.json({
        available: true,
        redirect: `/create/${domain}`
      });
    }

    return NextResponse.json({ available: false });
  } catch (error) {
    console.error('Erreur lors de la vérification du domaine:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 