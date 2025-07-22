export type CampaignInput = {
    name: string;
    description: string;
    image?: string;
};

export type GeneratedCampaignData = {
    headline: string;
    description: string;
    targetAudience: string;
    objective: string;
    budgetSuggestion: string;
    callToAction: string;
    suggestedKeywords: string[];
};
