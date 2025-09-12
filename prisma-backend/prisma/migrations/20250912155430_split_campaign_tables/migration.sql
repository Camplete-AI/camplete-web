/*
  Warnings:

  - You are about to drop the column `googleBudgetId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `googleCampaignId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `metaAdId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `metaAdSetId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `metaCampaignId` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "googleBudgetId",
DROP COLUMN "googleCampaignId",
DROP COLUMN "metaAdId",
DROP COLUMN "metaAdSetId",
DROP COLUMN "metaCampaignId";

-- CreateTable
CREATE TABLE "GoogleCampaign" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "budgetId" TEXT,

    CONSTRAINT "GoogleCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaCampaign" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "adSetId" TEXT,
    "adId" TEXT,
    "specialAdCategories" TEXT NOT NULL DEFAULT 'NONE',

    CONSTRAINT "MetaCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleCampaign_campaignId_key" ON "GoogleCampaign"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "MetaCampaign_campaignId_key" ON "MetaCampaign"("campaignId");

-- AddForeignKey
ALTER TABLE "GoogleCampaign" ADD CONSTRAINT "GoogleCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaCampaign" ADD CONSTRAINT "MetaCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
