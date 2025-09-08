import { prisma } from "prisma-backend/app/lib/prisma";
import { format } from "date-fns";
import { createHeaders } from "@/utils/google-ads.server";

const GOOGLE_API_BASE = "https://googleads.googleapis.com/v21";

// ====================
// Types
// ====================
interface CampaignUser {
    id: string;
    googleAccessToken: string | null;
    googleCustomerId: string | null;
    googleRefreshToken: string | null;
    businessName?: string | null;
}

interface CampaignData {
    id: string;
    name: string;
    budget?: number;
    headline?: string;
    adDescription?: string;
    user: CampaignUser;
}

interface ApiResponse {
    results?: Array<{ resourceName: string }>;
    [key: string]: unknown;
}

// ====================
// Utils
// ====================
const today = format(new Date(), "yyyyMMdd");
const nextWeek = format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyyMMdd");

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            grant_type: "refresh_token",
        }),
    });

    if (!response.ok) throw new Error(`Failed to refresh token: ${response.status}`);
    const data = (await response.json()) as { access_token: string };
    return data.access_token;
};

const logApiResponse = async (
    label: string,
    response: Response,
    requestPayload?: unknown
): Promise<ApiResponse> => {
    const text = await response.text();
    let json: ApiResponse = {};

    try {
        json = JSON.parse(text) as ApiResponse;
    } catch {
        console.log(`📡 ${label} [${response.status}] Raw Response:`, text);
    }

    console.log("===========================================");
    console.log(`📡 ${label} [${response.status}]`);
    if (requestPayload) {
        console.log("➡️ Request Payload:", JSON.stringify(requestPayload, null, 2));
    }
    console.log("⬅️ Response:", JSON.stringify(json, null, 2));
    console.log("===========================================");

    if (!response.ok) {
        const requestId =
            (json as any)?.error?.details?.[0]?.requestId || (json as any)?.error?.requestId;
        throw new Error(
            `${label} failed [${response.status}]: ${(json as any)?.error?.message || "Unknown"
            } (requestId=${requestId || "n/a"})`
        );
    }

    return json;
};

// ====================
// Main Class
// ====================
class GoogleAdsCampaignCreator {
    private campaign: CampaignData;
    private accessToken: string;
    private customerId: string;

    constructor(campaign: CampaignData) {
        this.campaign = campaign;
        this.accessToken = campaign.user.googleAccessToken!;
        this.customerId = campaign.user.googleCustomerId!;
    }

    private async makeAuthenticatedRequest(
        url: string,
        options: RequestInit
    ): Promise<Response> {
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                ...createHeaders(this.accessToken, this.customerId),
            },
        });

        if (response.status === 401 && this.campaign.user.googleRefreshToken) {
            console.log("🔄 Renovando access token...");
            this.accessToken = await refreshAccessToken(this.campaign.user.googleRefreshToken);

            await prisma.user.update({
                where: { id: this.campaign.user.id },
                data: { googleAccessToken: this.accessToken },
            });

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    ...createHeaders(this.accessToken, this.customerId),
                },
            });
        }

        return response;
    }

    private calculateBudgetMicros(): number {
        const microsPerUnit = 1_000_000;
        const budgetAmount = this.campaign.budget || 5;
        return budgetAmount * microsPerUnit;
    }

    private async createPerformanceMaxBulk(): Promise<void> {
        const url = `${GOOGLE_API_BASE}/customers/${this.customerId}/googleAds:mutate`;

        const mutateOperations = [
            // 1. Budget
            {
                campaignBudgetOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/campaignBudgets/-1`,
                        name: `Camplete AI-budget-${this.campaign.id}`,
                        amountMicros: this.calculateBudgetMicros(),
                        deliveryMethod: "STANDARD",
                        explicitlyShared: false,
                    },
                },
            },
            // 2. Campaign
            {
                campaignOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/campaigns/-2`,
                        name: this.campaign.name,
                        status: "PAUSED",
                        advertisingChannelType: "PERFORMANCE_MAX",
                        campaignBudget: `customers/${this.customerId}/campaignBudgets/-1`,
                        maximizeConversions: {},
                        startDate: today,
                        endDate: nextWeek,
                        urlExpansionOptOut: false,
                        brandGuidelinesEnabled: false,
                        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
                    },
                },
            },
            // 3. Asset Group
            {
                assetGroupOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/assetGroups/-3`,
                        name: `${this.campaign.name}-assets`,
                        campaign: `customers/${this.customerId}/campaigns/-2`,
                        finalUrls: ["https://example.com"],
                        status: "ENABLED",
                    },
                },
            },
            // 4. Headline asset + link
            {
                assetOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/assets/-4`,
                        textAsset: { text: this.campaign.headline || "Default Headline" },
                    },
                },
            },
            {
                assetGroupAssetOperation: {
                    create: {
                        assetGroup: `customers/${this.customerId}/assetGroups/-3`,
                        asset: `customers/${this.customerId}/assets/-4`,
                        fieldType: "HEADLINE",
                    },
                },
            },
            // 5. Description asset + link
            {
                assetOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/assets/-5`,
                        textAsset: { text: this.campaign.adDescription || "Default Description" },
                    },
                },
            },
            {
                assetGroupAssetOperation: {
                    create: {
                        assetGroup: `customers/${this.customerId}/assetGroups/-3`,
                        asset: `customers/${this.customerId}/assets/-5`,
                        fieldType: "DESCRIPTION",
                    },
                },
            },
            // 6. BusinessName asset + link
            {
                assetOperation: {
                    create: {
                        resourceName: `customers/${this.customerId}/assets/-6`,
                        textAsset: { text: this.campaign.user.businessName || "Camplete AI" },
                    },
                },
            },
            {
                assetGroupAssetOperation: {
                    create: {
                        assetGroup: `customers/${this.customerId}/assetGroups/-3`,
                        asset: `customers/${this.customerId}/assets/-6`,
                        fieldType: "BUSINESS_NAME",
                    },
                },
            },
        ];

        const response = await this.makeAuthenticatedRequest(url, {
            method: "POST",
            body: JSON.stringify({ mutateOperations }),
        });

        await logApiResponse("Create PMax Bulk", response, mutateOperations);
    }

    async execute(): Promise<void> {
        console.log(`🚀 Starting PMax bulk creation for account ${this.customerId}`);
        await this.createPerformanceMaxBulk();
        console.log("🎉 Performance Max campaign created successfully!");
    }
}

// ====================
// Exported Function
// ====================
export async function createGoogleCampaignRest(campaignId: string): Promise<void> {
    if (!campaignId) throw new Error("Campaign ID is required");

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { user: true },
    });

    if (!campaign || !campaign.user) throw new Error("Campaign or user not found");

    if (!campaign.user.googleAccessToken || !campaign.user.googleCustomerId) {
        throw new Error("Missing Google credentials - reconnect your Google account");
    }

    const creator = new GoogleAdsCampaignCreator(campaign as CampaignData);
    await creator.execute();
}
