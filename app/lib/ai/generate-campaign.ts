import { openai } from "@/services/openai";


export async function generateCampaign(inputs: {
    name: string;
    description: string;
}) {

    const prompt = `
    Você é um especialista sênior em marketing digital com ampla experiência em campanhas do Google Ads, especialmente no formato Performance Max.
    
    Seu objetivo é gerar uma campanha publicitária eficaz com base nas seguintes informações do produto:
    
    - Nome do produto/serviço: "${inputs.name}"
    - Descrição detalhada: "${inputs.description}"
    
    Com base nessas informações, crie um plano de campanha ideal no formato JSON, contendo os seguintes campos:
    
    {
      "headline": "Título principal curto e impactante (máximo 30 caracteres)",
      "description": "Descrição persuasiva do produto (máximo 90 caracteres)",
      "targetAudience": "Resumo do público-alvo ideal (ex: jovens empreendedores, mães que trabalham, etc.)",
      "objective": "Objetivo principal da campanha (ex: gerar leads, aumentar vendas, reconhecimento de marca)",
      "budgetSuggestion": "Sugestão de orçamento diário em dólares (formato numérico ou string como '$20/dia')",
      "callToAction": "Chamada para ação recomendada (ex: Compre agora, Saiba mais, Cadastre-se)",
      "suggestedKeywords": ["Palavra-chave 1", "Palavra-chave 2", "Palavra-chave 3"]
    }
    
    Regras:
    - Responda apenas com o JSON.
    - Não inclua explicações antes ou depois do JSON.
    - Certifique-se de que os campos estejam claros, bem escritos e ajustados ao perfil do produto.
    
    Capriche na linguagem e use tom publicitário de alta conversão.
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
