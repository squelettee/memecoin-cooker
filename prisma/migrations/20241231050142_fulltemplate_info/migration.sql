/*
  Warnings:

  - You are about to alter the column `tokenName` on the `Template` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `contractAddress` on the `Template` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `twitter` on the `Template` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[contractAddress]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "birdeye" VARCHAR(255),
ADD COLUMN     "coinGecko" VARCHAR(255),
ADD COLUMN     "coinMarketCap" VARCHAR(255),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dexscreener" VARCHAR(255),
ADD COLUMN     "dextool" VARCHAR(255),
ADD COLUMN     "imagePath" VARCHAR(255),
ADD COLUMN     "imageUrl" VARCHAR(255),
ADD COLUMN     "insta" VARCHAR(255),
ADD COLUMN     "pumpFun" VARCHAR(255),
ADD COLUMN     "telegram" VARCHAR(255),
ADD COLUMN     "templateType" VARCHAR(50),
ADD COLUMN     "tiktok" VARCHAR(255),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "whitepaper" VARCHAR(255),
ALTER COLUMN "tokenName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "contractAddress" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "twitter" DROP NOT NULL,
ALTER COLUMN "twitter" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Template_contractAddress_key" ON "Template"("contractAddress");
