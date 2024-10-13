/*
  Warnings:

  - The values [ACCEPTED,REJECTED] on the enum `CStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[challengeId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `challengeId` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED');
ALTER TABLE "Challenge" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Challenge" ALTER COLUMN "status" TYPE "CStatus_new" USING ("status"::text::"CStatus_new");
ALTER TYPE "CStatus" RENAME TO "CStatus_old";
ALTER TYPE "CStatus_new" RENAME TO "CStatus";
DROP TYPE "CStatus_old";
ALTER TABLE "Challenge" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "challengeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_challengeId_key" ON "Challenge"("challengeId");
