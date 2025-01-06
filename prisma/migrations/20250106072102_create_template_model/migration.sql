/*
  Warnings:

  - You are about to drop the column `birdeye` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `coinGecko` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `coinMarketCap` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `dextool` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `insta` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `pumpFun` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `templateType` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `Template` table. All the data in the column will be lost.
  - Added the required column `blockchain` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenSymbol` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PackType" AS ENUM ('BASIC', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('UPCOMING', 'LIVE', 'TRENDING', 'VERIFIED');

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "birdeye",
DROP COLUMN "coinGecko",
DROP COLUMN "coinMarketCap",
DROP COLUMN "dextool",
DROP COLUMN "imagePath",
DROP COLUMN "insta",
DROP COLUMN "pumpFun",
DROP COLUMN "templateType",
DROP COLUMN "tiktok",
ADD COLUMN     "auditLink" VARCHAR(255),
ADD COLUMN     "blockchain" VARCHAR(50) NOT NULL,
ADD COLUMN     "discord" VARCHAR(255),
ADD COLUMN     "kycVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "launchDate" TIMESTAMP(3),
ADD COLUMN     "marketCap" VARCHAR(100),
ADD COLUMN     "packType" "PackType" NOT NULL DEFAULT 'BASIC',
ADD COLUMN     "partnerships" JSONB,
ADD COLUMN     "roadmap" TEXT,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'UPCOMING',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "team" JSONB,
ADD COLUMN     "tokenSymbol" VARCHAR(20) NOT NULL,
ADD COLUMN     "totalSupply" VARCHAR(100),
ADD COLUMN     "website" VARCHAR(255);
