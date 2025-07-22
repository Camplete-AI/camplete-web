/*
  Warnings:

  - You are about to drop the column `externalId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `adDescription` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audience` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetSuggestion` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `callToAction` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headline` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objective` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "externalId",
DROP COLUMN "feedback",
ADD COLUMN     "adDescription" TEXT NOT NULL,
ADD COLUMN     "audience" TEXT NOT NULL,
ADD COLUMN     "budgetSuggestion" TEXT NOT NULL,
ADD COLUMN     "callToAction" TEXT NOT NULL,
ADD COLUMN     "headline" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT NOT NULL,
ADD COLUMN     "objective" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';
