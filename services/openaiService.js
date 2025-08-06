// 1. Importa a biblioteca oficial da OpenAI (funciona com OpenRouter também)
const { OpenAI } = require('openai');

// 2. Cria uma instância com sua API Key e URL do OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// 3. Função principal para gerar campanha
async function gerarCampanha(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 segundos

  try {
    const completion = await openai.chat.completions.create({
      model: 'openrouter/gpt-3.5-turbo', // ou outro modelo disponível
      messages: [
        { role: "system", content: "Você é uma IA que gera campanhas CSV para Google Ads Editor com SEO e performance máxima." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      signal: controller.signal
    });

    clearTimeout(timeout);
    return completion.choices[0].message.content;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('⏱ Tempo de resposta da IA esgotado.');
    }

    throw error?.response?.data?.error?.message || error;
  }
}

// 4. Exporta a função para uso externo
module.exports = gerarCampanha;
