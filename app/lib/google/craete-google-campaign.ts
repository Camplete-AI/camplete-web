import { client } from "@/services/google";
import { prisma } from "prisma-backend/app/lib/prisma";

const IS_DEV = process.env.NODE_ENV === "development";

export async function createGoogleCampaign(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { user: true },
    });

    if (!campaign || !campaign.user) throw new Error("Campaign or user not found");

    const { name, headline, description } = campaign;

    const customerId = IS_DEV
        ? process.env.GOOGLE_DEV_CUSTOMER_ID!
        : campaign.user.googleCustomerId;

    const refreshToken = IS_DEV
        ? process.env.GOOGLE_DEV_REFRESH_TOKEN!
        : campaign.user.googleRefreshToken;

    if (!customerId || !refreshToken) {
        throw new Error("Missing Google credentials");
    }

    const customer = client.Customer({
        customer_id: customerId,
        refresh_token: refreshToken,
    });

    const budgetResponse = await customer.campaignBudgets.create([
        {
            name: `${name}-budget`,
            amount_micros: 20_000_000,
            delivery_method: "STANDARD",
        },
    ]);
    const budget = budgetResponse.results?.[0];

    const campaignRes = await customer.campaigns.create([
        {
            name,
            status: "PAUSED",
            advertising_channel_type: "PERFORMANCE_MAX",
            campaign_budget: budget.resource_name,
        },
    ]);

    const campaignResourceName = campaignRes.results?.[0]?.resource_name;
    if (!campaignResourceName) throw new Error("Failed to create campaign");

    const adGroupRes = await customer.adGroups.create([
        {
            name: `${name}-group`,
            campaign: campaignResourceName,
            status: "ENABLED",
        },
    ]);

    const adGroupResourceName = adGroupRes.results?.[0]?.resource_name;
    if (!adGroupResourceName) throw new Error("Failed to create ad group");

    await customer.adGroupAds.create([
        {
            ad_group: adGroupResourceName,
            status: "PAUSED",
            ad: {
                responsive_search_ad: {
                    headlines: [{ text: headline }],
                    descriptions: [{ text: description }],
                },
                final_urls: ["https://your-site.com"],
            },
        },
    ]);

    console.log("✅ Campaign created in Google Ads", {
        mode: IS_DEV ? "development (sandbox)" : "production",
    });
}
