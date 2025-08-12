// services/openRouterService.js
const axios = require('axios');

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  timeout: 15000,
  headers: {
    'Referer': 'https://seusite.com', // Ajuste para seu domínio real
    'X-Title': 'MaquinaCampanhaIA'
  }
});

async function gerarCampanha(prompt, retries = 2) {
  try {
    const response = await openRouterClient.post(
      '/chat/completions',
      {
        model: 'openai/gpt-4o-mini', // Ajuste conforme sua assinatura e disponibilidade
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

    if (
      !response || 
      !response.data || 
      !response.data.choices || 
      !Array.isArray(response.data.choices) || 
      !response.data.choices[0] ||
      !response.data.choices[0].message ||
      !response.data.choices[0].message.content
    ) {
      throw new Error('Resposta da IA inválida ou vazia');
    }

    return response.data.choices[0].message.content;

  } catch (err) {
    console.error('[ERRO OpenRouter]', err.message || err);

    if (retries > 0) {
      console.log(`Tentando novamente... Restam ${retries} tentativas`);
      return gerarCampanha(prompt, retries - 1);
    }

    throw new Error('Falha ao gerar campanha com OpenRouter após múltiplas tentativas.');
  }
}

module.exports = { gerarCampanha };
