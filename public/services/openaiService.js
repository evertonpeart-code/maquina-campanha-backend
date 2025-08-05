// 1. Importa a biblioteca oficial da OpenAI
const { OpenAI } = require('openai');

// 2. Cria uma instância com sua API Key vinda do .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 3. Função principal para gerar campanha
async function gerarCampanha(prompt) {
  // 3.1 Cria um "controller" para forçar timeout se demorar demais
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 segundos

  try {
    // 3.2 Envia o prompt para o modelo da OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ou "gpt-4" se tiver acesso
      messages: [
        { role: "system", content: "Você é uma IA que gera campanhas CSV para Google Ads Editor com SEO e performance máxima." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      signal: controller.signal // respeita o timeout
    });

    // 3.3 Cancela o timeout se deu tudo certo
    clearTimeout(timeout);

    // 3.4 Retorna a resposta da IA (somente o conteúdo da mensagem)
    return completion.choices[0].message.content;

  } catch (error) {
    // 3.5 Se o erro for de timeout, retorna erro específico
    if (error.name === 'AbortError') {
      throw new Error('⏱ Tempo de resposta da IA esgotado.');
    }

    // 3.6 Se for erro da API, retorna a mensagem detalhada
    throw error?.response?.data?.error?.message || error;
  }
}

// 4. Exporta a função para uso em outras partes do código
module.exports = gerarCampanha;
