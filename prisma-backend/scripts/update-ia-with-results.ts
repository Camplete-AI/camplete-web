
import { updateIAWithResults } from "@/lib/ai/update-ai-with-results";
import { prisma } from "../app/lib/prisma";

async function main() {
    const publishedCampaigns = await prisma.campaign.findMany({
        where: { status: "PUBLISHED" },
    });

    for (const campaign of publishedCampaigns) {
        try {
            await updateIAWithResults(campaign.id);
            console.log(`✅ Atualizada campanha ${campaign.id}`);
        } catch (err) {
            console.error(`❌ Erro na campanha ${campaign.id}:`, err);
        }
    }

    process.exit();
}

main();
