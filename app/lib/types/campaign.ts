export type CampaignInput = {
    name: string;
    description: string;
    image?: string;
    budget?: number;
    biddingStrategy?: string;
    specialAdCategories?: string;
    googleCampaignId?: string;
    googleBudgetId?: string;
};


export enum ConversionActionCategory {
    UNSPECIFIED = "UNSPECIFIED",
    UNKNOWN = "UNKNOWN",
    DEFAULT = "DEFAULT",
    PAGE_VIEW = "PAGE_VIEW",
    PURCHASE = "PURCHASE",
    SIGNUP = "SIGNUP",
    DOWNLOAD = "DOWNLOAD",
    ADD_TO_CART = "ADD_TO_CART",
    BEGIN_CHECKOUT = "BEGIN_CHECKOUT",
    SUBSCRIBE_PAID = "SUBSCRIBE_PAID",
    PHONE_CALL_LEAD = "PHONE_CALL_LEAD",
    IMPORTED_LEAD = "IMPORTED_LEAD",
    SUBMIT_LEAD_FORM = "SUBMIT_LEAD_FORM",
    BOOK_APPOINTMENT = "BOOK_APPOINTMENT",
    REQUEST_QUOTE = "REQUEST_QUOTE",
    GET_DIRECTIONS = "GET_DIRECTIONS",
    OUTBOUND_CLICK = "OUTBOUND_CLICK",
    CONTACT = "CONTACT",
    ENGAGEMENT = "ENGAGEMENT",
    STORE_VISIT = "STORE_VISIT",
    STORE_SALE = "STORE_SALE",
    QUALIFIED_LEAD = "QUALIFIED_LEAD",
    CONVERTED_LEAD = "CONVERTED_LEAD",
}

export type GeneratedCampaignData = {
    headline: string;
    longHeadline?: string;
    description: string;
    targetAudience: string;
    objective: string;
    budgetSuggestion: string;
    callToAction: string;
    suggestedKeywords: string[];
    conversionCategory: ConversionActionCategory;
    conversionValue: number;
    businessName?: string;
    youtubeVideoUrl?: string;
};

