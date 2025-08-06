const axios = require('axios');
require('dotenv').config();

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  timeout: 20000,
  headers: {
    'HTTP-Referer': 'http://localhost:3000', // ou o domínio real quando publicar
    'X-Title': 'MaquinaCampanhaIA',
  },
});

async function gerarCampanha(prompt) {
  try {
    const response = await openRouterClient.post(
      '/chat/completions',
      {
        model: 'openai/gpt-4o', // você pode alterar o modelo se preferir
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const resposta = response?.data?.choices?.[0]?.message?.content;

    if (!resposta) throw new Error('Resposta vazia da IA');

    return resposta;
  } catch (err) {
    console.error('[ERRO IA]', err.message || err);
    throw new Error('Falha ao gerar campanha com OpenRouter.');
  }
}

module.exports = { gerarCampanha };
