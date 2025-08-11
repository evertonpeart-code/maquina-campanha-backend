const express = require('express');
const router = express.Router();
const { gerarCampanha } = require('../services/openRouterService');
const rateLimit = require('express-rate-limit');

// Limite básico para evitar abusos: 10 requisições por minuto por IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10,
  message: { error: 'Limite de requisições atingido, tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', limiter, async (req, res) => {
  const { prompt } = req.body;

  // Validação robusta do prompt
  if (
    !prompt ||
    typeof prompt !== 'string' ||
    prompt.trim().length < 10 ||
    prompt.trim().length > 2000
  ) {
    return res.status(400).json({
      error: 'Prompt inválido. Deve ser uma string entre 10 e 2000 caracteres.',
    });
  }

  const maxRetries = 3;
  let attempt = 0;
  let lastError;

  while (attempt < maxRetries) {
    try {
      const resultado = await gerarCampanha(prompt.trim());
      return res.json({ resultado });
    } catch (err) {
      lastError = err;
      attempt++;
      console.warn(`[Tentativa ${attempt} falhou]`, err.message || err);
      if (attempt >= maxRetries) {
        console.error('[ERRO ROTA /api/campaign] Todas tentativas falharam:', err);
        return res.status(502).json({
          error: 'Erro ao gerar campanha após várias tentativas. Tente novamente mais tarde.',
        });
      }
      // Aguarda 500ms antes da próxima tentativa
      await new Promise((r) => setTimeout(r, 500));
    }
  }
});

module.exports = router;
