-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "longHeadline" TEXT,
ADD COLUMN     "youtubeVideoUrl" TEXT,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "budgetSuggestion" DROP NOT NULL;
