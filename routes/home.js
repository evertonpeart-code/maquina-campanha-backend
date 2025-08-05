const express = require('express');
const router = express.Router();

// Exemplo de rota modular
router.get('/', (req, res) => {
  res.json({ status: '🔁 API da Máquina IA está respondendo!' });
});

module.exports = router;
