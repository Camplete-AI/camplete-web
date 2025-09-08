import { openai } from "@/services/openai";

export async function generateCampaign(inputs: {
    name: string;
    description: string;
}) {
    const prompt = `
Você é um especialista em Google Ads com foco em campanhas Performance Max.

Com base nas seguintes informações:
- Nome do produto: "${inputs.name}"
- Descrição: "${inputs.description}"

Gere um JSON com os seguintes campos:
{
  "headline": "Título principal curto e impactante (máx. 30 caracteres)",
  "longHeadline": "Versão longa do título (máx. 90 caracteres)",
  "description": "Descrição persuasiva (máx. 90 caracteres)",
  "businessName": "Nome da empresa ou marca",
  "targetAudience": "Público-alvo ideal",
  "objective": "Objetivo principal da campanha",
  "budgetSuggestion": "Sugestão de orçamento diário (ex: $20/dia)",
  "callToAction": "Chamada para ação (ex: Compre agora)",
  "suggestedKeywords": ["Palavra-chave 1", "Palavra-chave 2"],
  "conversionCategory": "Categoria de conversão (ex: PURCHASE)",
  "conversionValue": "Valor médio por conversão (ex: 50.0)",
  "imageUrl": "URL de imagem para o criativo (de preferência 1200x628)",
  "youtubeVideoUrl": "Link para vídeo no YouTube (opcional, pode ser real ou fictício)"
}

Regras:
- Responda apenas com o JSON.
- Não inclua texto antes ou depois.
- Capriche nos textos com tom publicitário e de alta conversão.
`;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
        temperature: 0.8,
    });

    const json = extractJSON(completion.choices[0].message.content);
    return json;
}

function extractJSON(text: string | null) {
    try {
        const match = text?.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("No JSON found");
        return JSON.parse(match[0]);
    } catch (e) {
        console.error("Error parsing AI response:", e);
        throw new Error("Failed to parse AI response: " + (e instanceof Error ? e.message : String(e)));
    }
}
