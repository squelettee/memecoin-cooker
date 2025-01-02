/*
  Warnings:

  - You are about to drop the `SiteWeb` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SiteWeb";

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_domain_key" ON "Template"("domain");
