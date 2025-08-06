// 1. Importa a biblioteca oficial da OpenAI
const OpenAI = require('openai');

// 2. Cria uma instância com a API do OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1', // ESSENCIAL!
});

// 3. Função principal para gerar campanha
async function gerarCampanha(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo', // Modelo gratuito via OpenRouter
      messages: [
        {
          role: "system",
          content: "Você é uma IA especialista em criar campanhas Google Ads em CSV otimizadas com SEO e alta performance. Responda no formato do Google Ads Editor."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
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

module.exports = gerarCampanha;
