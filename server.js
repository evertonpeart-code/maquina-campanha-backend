require('dotenv').config();
const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Verifica se a chave da IA está presente
if (!process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️  AVISO: OPENROUTER_API_KEY não está definida no .env');
}

app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api/campaign', campaignRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('🚀 Máquina de Campanha IA está ativa!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${port}`);
});
