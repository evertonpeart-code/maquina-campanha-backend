const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/gerar-campanha', async (req, res) => {
  const { id_google_ads, url_produto, url_afiliado } = req.body;

  const prompt = `
Você é uma IA especializada em criar campanhas Google Ads em CSV para o Google Ads Editor. Gere uma campanha ultra otimizada com SEO, com base nestes dados:

- ID: ${id_google_ads}
- URL do Produto: ${url_produto}
- URL do Afiliado: ${url_afiliado}

Responda no formato estruturado, com colunas, campos de preenchimento e instruções. Siga o padrão do Google Ads Editor e inclua anúncios A/B, sitelinks, callouts e snippets.
`;

  try {
    const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "Você é um gerador de campanhas Google Ads..." },
    { role: "user", content: "Produto: https://..." }
  ]
});


    const resposta = completion.choices[0].message.content;
    res.json({ sucesso: true, csv: resposta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, erro: 'Erro ao gerar campanha com a IA.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
