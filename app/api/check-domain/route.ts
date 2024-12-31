import { NextResponse } from 'next/server';

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
    // Ici, ajoutez votre logique pour vérifier si le domaine existe dans votre base de données
    // Par exemple avec Prisma :
    // const existingDomain = await prisma.domain.findUnique({
    //   where: { name: domain }
    // });

    // Pour l'exemple, on simule une vérification
    const isAvailable = true; // Remplacer par votre vraie logique

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