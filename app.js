// app.js
// Configuração principal da aplicação Express

const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// Middlewares globais
app.use(cors()); // Libera acesso de diferentes domínios (CORS)
app.use(express.json()); // Permite ler JSON no corpo das requisições

// Rotas principais
app.use('/api/campaign', campaignRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('🚀 Máquina de Campanha IA está ativa!');
});

module.exports = app;
