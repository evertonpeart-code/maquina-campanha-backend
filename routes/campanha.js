// routes/campanha.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { gerarCampanha } = require('../services/openaiService');

router.post(
  '/',
  [
    body('produto').trim().notEmpty().withMessage('O campo "produto" é obrigatório.'),
    body('url').trim().isURL().withMessage('Informe uma URL válida para o produto.'),
    body('afiliado').trim().isURL().withMessage('Informe uma URL válida para o afiliado.')
  ],
  async (req, res) => {
    // Validação dos dados recebidos
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({
        sucesso: false,
        erros: erros.array()
      });
    }

    // Extração dos dados do corpo da requisição
    const { produto, url, afiliado } = req.body;

    // Prompt formatado para a IA
    const prompt = `
Crie uma campanha Google Ads com base nestes dados:
Produto: ${produto}
URL oficial: ${url}
URL do afiliado: ${afiliado}

Gere títulos, descrições, palavras-chave, sitelinks e snippets prontos para copiar e colar.
Formato organizado. Copywriting forte. Alta conversão.
`;

    try {
      // Chamada ao serviço que consulta a IA
      const resposta = await gerarCampanha(prompt);
      return res.json({ sucesso: true, resposta });
    } catch (err) {
      console.error('[ERRO rota /campanha]', err);
      return res.status(500).json({
        sucesso: false,
        erro: err.message || 'Erro inesperado ao gerar campanha.'
      });
    }
  }
);

module.exports = router;
