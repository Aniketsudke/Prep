/*
  Warnings:

  - The primary key for the `Attempt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attemptDate` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `numericalAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_CorrectOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionOptions` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `questionId` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `topic` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Availble', 'Playing', 'Offline');

-- CreateEnum
CREATE TYPE "CStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CorrectOptions" DROP CONSTRAINT "_CorrectOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_CorrectOptions" DROP CONSTRAINT "_CorrectOptions_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionOptions" DROP CONSTRAINT "_QuestionOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionOptions" DROP CONSTRAINT "_QuestionOptions_B_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_pkey",
DROP COLUMN "attemptDate",
DROP COLUMN "id",
DROP COLUMN "status",
ADD COLUMN     "solvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isCorrect" SET DEFAULT false,
ADD CONSTRAINT "Attempt_pkey" PRIMARY KEY ("userId", "questionId", "solvedAt");

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "questionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "numericalAnswer",
ADD COLUMN     "isnumerical" DOUBLE PRECISION,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "topic" TEXT NOT NULL,
ALTER COLUMN "accuracy" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'Availble';

-- DropTable
DROP TABLE "_CorrectOptions";

-- DropTable
DROP TABLE "_QuestionOptions";

-- DropEnum
DROP TYPE "AttemptStatus";

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT,
    "status" "CStatus" NOT NULL DEFAULT 'PENDING',
    "winner" TEXT,
    "user1Score" INTEGER DEFAULT 0,
    "user2Score" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChallengeToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChallengeToQuestion_AB_unique" ON "_ChallengeToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_ChallengeToQuestion_B_index" ON "_ChallengeToQuestion"("B");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengeToQuestion" ADD CONSTRAINT "_ChallengeToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengeToQuestion" ADD CONSTRAINT "_ChallengeToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
