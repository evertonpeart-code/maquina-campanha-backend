// services/openRouterService.js
const axios = require('axios');

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  timeout: 15000,
  headers: {
    'HTTP-Referer': 'https://seusite.com', // Substitua pelo domínio real depois
    'X-Title': 'MaquinaCampanhaIA'
  }
});

async function gerarCampanha(prompt) {
  try {
    const response = await openRouterClient.post(
      '/chat/completions',
      {
        model: 'openai/gpt-4o', // Use o modelo desejado
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    const resposta = response?.data?.choices?.[0]?.message?.content;

    if (!resposta) {
      throw new Error('Resposta vazia da IA');
    }

    return resposta;
  } catch (err) {
    console.error('[ERRO OpenRouter]', err.message || err);
    throw new Error('Falha ao gerar campanha com OpenRouter.');
  }
}

module.exports = { gerarCampanha };
