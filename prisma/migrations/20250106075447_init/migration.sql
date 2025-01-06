/*
  Warnings:

  - The values [ENTERPRISE] on the enum `PackType` will be removed. If these variants are still used in the database, this will fail.
  - The values [UPCOMING,TRENDING,VERIFIED] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `auditLink` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `discord` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `kycVerified` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `marketCap` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `partnerships` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `roadmap` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `totalSupply` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `whitepaper` on the `Template` table. All the data in the column will be lost.
  - Made the column `launchDate` on table `Template` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PackType_new" AS ENUM ('BASIC', 'MEDIUM', 'PREMIUM');
ALTER TABLE "Template" ALTER COLUMN "packType" DROP DEFAULT;
ALTER TABLE "Template" ALTER COLUMN "packType" TYPE "PackType_new" USING ("packType"::text::"PackType_new");
ALTER TYPE "PackType" RENAME TO "PackType_old";
ALTER TYPE "PackType_new" RENAME TO "PackType";
DROP TYPE "PackType_old";
ALTER TABLE "Template" ALTER COLUMN "packType" SET DEFAULT 'BASIC';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('PENDING', 'LIVE');
ALTER TABLE "Template" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Template" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
ALTER TABLE "Template" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "auditLink",
DROP COLUMN "discord",
DROP COLUMN "kycVerified",
DROP COLUMN "marketCap",
DROP COLUMN "partnerships",
DROP COLUMN "roadmap",
DROP COLUMN "tags",
DROP COLUMN "team",
DROP COLUMN "totalSupply",
DROP COLUMN "website",
DROP COLUMN "whitepaper",
ADD COLUMN     "aiAgent" JSONB,
ADD COLUMN     "aiEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aiLanguages" TEXT[] DEFAULT ARRAY['en']::TEXT[],
ADD COLUMN     "aiPrompt" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "launchDate" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
