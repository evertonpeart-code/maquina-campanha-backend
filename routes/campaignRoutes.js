// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const { gerarCampanha } = require('../services/openRouterService');

// Rota para geração de campanha
router.post('/', async (req, res) => {
  const { url_produto, url_afiliado, id_google_ads } = req.body;

  if (!url_produto || !url_afiliado || !id_google_ads) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando: url_produto, url_afiliado, id_google_ads.' });
  }

  try {
    // Monta o prompt para enviar à IA (ajuste conforme sua necessidade)
    const prompt = `
      Crie uma campanha Google Ads para o produto: ${url_produto}
      Link de afiliado: ${url_afiliado}
      ID Google Ads: ${id_google_ads}
      Utilize SEO e formato de alta conversão conforme as melhores práticas.
    `;

    const resultado = await gerarCampanha(prompt);

    // Envia a resposta direta para o frontend
    res.json(resultado);
  } catch (err) {
    console.error('[ERRO ROTA /api/campaign]', err.message || err);
    res.status(500).json({ error: 'Erro ao gerar campanha.' });
  }
});

module.exports = router;
