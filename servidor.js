const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Verifica se a chave foi lida corretamente (log para debug no Render)
console.log("API Key da OpenAI carregada:", !!process.env.OPENAI_API_KEY);

// Instância da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/gerar', async (req, res) => {
  try {
    const { produto, publico, pais, idioma, urlProduto, urlAfiliado } = req.body;

    if (!produto || !publico || !pais || !idioma || !urlProduto || !urlAfiliado) {
      return res.status(400).json({ sucesso: false, erro: 'Dados incompletos.' });
    }

    const prompt = `Crie uma campanha do Google Ads em formato CSV para o seguinte produto: ${produto}. Público-alvo: ${publico}. País: ${pais}. Idioma: ${idioma}. Página do produto: ${urlProduto}. Link de afiliado: ${urlAfiliado}. Gere uma estrutura completa com headlines, descrições, sitelinks, callouts e snippets. Formato compatível com Google Ads Editor.`;

    const resposta = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const csvCampanha = resposta.choices[0].message.content;

    res.json({ sucesso: true, campanha: csvCampanha });
  } catch (error) {
    console.error('Erro ao gerar campanha:', error);
    res.status(500).json({ sucesso: false, erro: 'Erro ao gerar campanha com a IA.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});