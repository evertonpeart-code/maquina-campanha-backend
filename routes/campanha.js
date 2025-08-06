// Estrutura completa do backend da Máquina de Campanha IA com melhorias aplicadas

// 📁 server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const gerarCampanha = require('./services/openaiService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Rota principal de geração
app.post('/api/gerar-campanha', async (req, res) => {
  const { id_google_ads, url_produto, url_afiliado } = req.body;

  if (!id_google_ads || !url_produto || !url_afiliado) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Todos os campos (ID, URL do produto e URL do afiliado) são obrigatórios.',
    });
  }

  const prompt = `
Você é uma IA especialista em Google Ads. Gere uma campanha otimizada com SEO para Google Ads Editor com base:

- ID: ${id_google_ads}
- URL do Produto: ${url_produto}
- URL do Afiliado: ${url_afiliado}

Responda em CSV estruturado com títulos, descrições, palavras-chave, sitelinks, callouts e snippets. Formato pronto para Google Ads Editor.
`;

  try {
    const resposta = await gerarCampanha(prompt);
    res.json({ sucesso: true, csv: resposta });
  } catch (erro) {
    console.error('❌ Erro:', erro);
    res.status(500).json({ sucesso: false, erro: 'Erro interno ao gerar campanha.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});


// 📁 services/openaiService.js
const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o';

async function gerarCampanha(prompt) {
  try {
    const resposta = await axios.post(
      OPENROUTER_API_URL,
      {
        model: DEFAULT_MODEL,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return resposta.data.choices[0].message.content;
  } catch (erro) {
    console.error('[OpenRouter Error]', erro.response?.data || erro.message);
    throw new Error('Falha ao gerar campanha com a IA.');
  }
}

module.exports = gerarCampanha;


// 📁 .env.example (deve ser renomeado para .env)
PORT=3000
OPENROUTER_API_KEY=[##########]
OPENROUTER_MODEL=openai/gpt-4o


// 📁 Estrutura de pastas sugerida:
// maquina-campanha/
// ├── server.js
// ├── services/
// │   └── openaiService.js
// ├── public/ (coloque os arquivos HTML/CSS/JS da interface aqui)
// ├── .env.example
// ├── package.json
