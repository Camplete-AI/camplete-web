
import { googleAdsClient } from "@/services/google";
import { prisma } from "prisma-backend/app/lib/prisma";


export async function createGoogleCampaign(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) throw new Error("Campaign not found");

    await googleAdsClient.createAsset({
        imageUrl: campaign.image,
        customerId: campaign.customerId,
        token: campaign.accessToken,
    });
}
