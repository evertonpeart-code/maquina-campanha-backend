// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const { gerarCampanha } = require('../services/openRouterService');

// Rota para geração de campanha
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt é obrigatório.' });
  }

  try {
    const resultado = await gerarCampanha(prompt);
    res.json({ resultado });
  } catch (err) {
    console.error('[ERRO ROTA /api/campaign]', err.message || err);
    res.status(500).json({ error: 'Erro ao gerar campanha.' });
  }
});

module.exports = router;
