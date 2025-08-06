require('dotenv').config();
const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// Segurança: aviso se não houver chave da IA
if (!process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️  AVISO: OPENROUTER_API_KEY não está definida no .env');
}

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/campaign', campaignRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Máquina de Campanha IA está ativa!');
});

module.exports = app;
