// routes/campanha.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { gerarCampanha } = require('../services/openaiService');

router.post(
  '/',
  [
    body('produto').notEmpty().withMessage('O campo produto é obrigatório.'),
    body('url').isURL().withMessage('Informe uma URL válida.'),
    body('afiliado').isURL().withMessage('Informe uma URL de afiliado válida.')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({
        sucesso: false,
        erros: erros.array()
      });
    }

    const { produto, url, afiliado } = req.body;

    const prompt = `
Crie uma campanha Google Ads com base nestes dados:
Produto: ${produto}
URL oficial: ${url}
URL do afiliado: ${afiliado}

Gere títulos, descrições, palavras-chave, sitelinks e snippets prontos para copiar e colar.
Formato organizado. Copywriting forte. Alta conversão.
`;

    try {
      const resposta = await gerarCampanha(prompt);
      return res.json({ sucesso: true, resposta });
    } catch (err) {
      return res.status(500).json({
        sucesso: false,
        erro: err.message || 'Erro inesperado ao gerar campanha.'
      });
    }
  }
);

module.exports = router;
