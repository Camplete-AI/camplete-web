import { google } from "googleapis";

import { prisma } from "prisma-backend/app/lib/prisma";
import { getGoogleAuthClient } from "./auth";

export async function getGoogleMetrics(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { user: true },
    });

    if (!campaign || !campaign.externalId || !campaign.user) {
        throw new Error("Dados insuficientes para buscar métricas");
    }

    if (!campaign.user.googleAccessToken) {
        throw new Error("Google access token is missing");
    }
    const auth = getGoogleAuthClient(campaign.user.googleAccessToken);

    const ads = new google.ads.googleads.v16.GoogleAdsClient({ auth });

    const response = await ads.customers.search({
        customerId: campaign.user.googleCustomerId,
        requestBody: {
            query: `
        SELECT 
          campaign.id,
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.conversions,
          metrics.cost_micros
        FROM campaign
        WHERE campaign.id = ${campaign.externalId}
        DURING LAST_7_DAYS
      `,
        },
    });

    const row = response.data.results?.[0];

    return {
        impressions: Number(row?.metrics?.impressions || 0),
        clicks: Number(row?.metrics?.clicks || 0),
        ctr: parseFloat(row?.metrics?.ctr || "0"),
        cpc: Number(row?.metrics?.averageCpc?.micros || 0) / 1_000_000,
        conversions: Number(row?.metrics?.conversions || 0),
        cost: Number(row?.metrics?.costMicros || 0) / 1_000_000,
    };
}
