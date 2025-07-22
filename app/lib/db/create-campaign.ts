
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
            name: input.name,
            description: input.description,
            image: input.image,
            headline: generated.headline,
            adDescription: generated.description,
            audience: generated.targetAudience,
            objective: generated.objective,
            budgetSuggestion: generated.budgetSuggestion,
            callToAction: generated.callToAction,
            keywords: generated.suggestedKeywords.join(", "),
            status: "DRAFT",
        },
    });
}
