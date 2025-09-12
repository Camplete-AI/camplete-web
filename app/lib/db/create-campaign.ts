import { prisma } from "prisma-backend/app/lib/prisma";
import { CampaignInput, GeneratedCampaignData } from "../types/campaign";

export async function createCampaign(
    input: CampaignInput,
    generated: GeneratedCampaignData,
    userId: string
) {
    return await prisma.campaign.create({
        data: {
            userId,
            // === Campos gerais ===
            name: input.name,
            description: input.description,
            image: input.image,
            headline: generated.headline,
            longHeadline: generated.longHeadline ?? null,
            adDescription: generated.description,
            audience: generated.targetAudience,
            objective: generated.objective,
            budgetSuggestion: generated.budgetSuggestion,
            callToAction: generated.callToAction,
            keywords: generated.suggestedKeywords.join(", "),
            conversionCategory: generated.conversionCategory ?? null,
            conversionValue: Number(generated.conversionValue) || null,
            budget: input.budget,
            biddingStrategy: input.biddingStrategy,
            businessName: generated.businessName ?? null,
            youtubeVideoUrl: generated.youtubeVideoUrl ?? null,
            status: "DRAFT",

            // === Relacionamentos ===
            google: input.googleCampaignId
                ? {
                    create: {
                        budgetId: input.googleBudgetId ?? null,
                    },
                }
                : undefined,

            meta: {
                create: {
                    adSetId: null,
                    adId: null,
                    specialAdCategories: input.specialAdCategories ?? "NONE",
                },
            },
        },
        include: {
            google: true,
            meta: true,
        },
    });
}
