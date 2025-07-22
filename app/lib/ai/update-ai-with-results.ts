
import { openai } from "@/services/openai";
import { getGoogleMetrics } from "../google/metrics";

export async function updateIAWithResults(campaignId: string) {
    const metrics = await getGoogleMetrics(campaignId);

    const feedback = `
Campanha ID ${campaignId} teve CTR de ${metrics.ctr}, CPC de ${metrics.cpc}.
Melhore a estratégia para próxima vez.
`;

    await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: feedback }],
    });

}
