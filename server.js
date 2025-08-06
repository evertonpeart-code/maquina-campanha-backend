const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const gerarCampanha = require('./services/openaiService');

dotenv.config();

// VERIFICAÇÃO ATUALIZADA (OpenRouter)
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY não configurada no ambiente!");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota principal
app.post('/api/gerar-campanha', async (req, res) => {
  const { id_google_ads, url_produto, url_afiliado } = req.body;

  // Validação de campos
  if (!id_google_ads || !url_produto || !url_afiliado) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Todos os campos (ID, URL do produto e URL do afiliado) são obrigatórios.',
    });
  }

  const prompt = `
Você é uma IA especializada em criar campanhas Google Ads em CSV para o Google Ads Editor. Gere uma campanha ultra otimizada com SEO, com base nestes dados:

- ID: ${id_google_ads}
- URL do Produto: ${url_produto}
- URL do Afiliado: ${url_afiliado}

Responda no formato estruturado, com colunas, campos de preenchimento e instruções. Siga o padrão do Google Ads Editor e inclua anúncios A/B, sitelinks, callouts e snippets.
`;

  console.log("🧠 Prompt enviado à IA:\n", prompt);

  try {
    const resposta = await gerarCampanha(prompt);
    res.json({ sucesso: true, csv: resposta });
  } catch (error) {
    console.error("❌ Erro ao gerar campanha:", error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao gerar campanha com a IA.',
    });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
