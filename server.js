require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { gerarCampanha } = require('./services/openRouterService'); // CORRIGIDO
const fs = require('fs');
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/gerar-campanha', async (req, res) => {
  const { prompt } = req.body;
  console.log('🧠 Prompt enviado à IA:\n', prompt);

  try {
    const resultado = await gerarCampanha(prompt);
    console.log('✅ Campanha gerada!');
    res.json({ sucesso: true, resposta: resultado });
  } catch (err) {
    console.error('❌ Erro ao gerar campanha:', err.message);
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
