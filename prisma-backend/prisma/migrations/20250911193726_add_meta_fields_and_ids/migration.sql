-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "googleBudgetId" TEXT,
ADD COLUMN     "googleCampaignId" TEXT,
ADD COLUMN     "metaAdId" TEXT,
ADD COLUMN     "metaAdSetId" TEXT,
ADD COLUMN     "metaCampaignId" TEXT,
ADD COLUMN     "placements" JSONB,
ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "metaPageId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
