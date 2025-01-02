-- CreateTable
CREATE TABLE "SiteWeb" (
    "id" SERIAL NOT NULL,
    "nomsDeDomaine" TEXT[],

    CONSTRAINT "SiteWeb_pkey" PRIMARY KEY ("id")
);
