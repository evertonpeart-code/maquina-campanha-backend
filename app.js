// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// Middlewares globais
app.use(helmet());               // Segurança HTTP headers
app.use(cors());                 // Libera CORS para qualquer domínio (ajuste se quiser limitar)
app.use(express.json());         // Parse JSON no corpo das requisições
app.use(morgan('combined'));     // Logs detalhados de requisições HTTP

// Rotas
app.use('/api/campaign', campaignRoutes);

// Rota raiz para teste simples
app.get('/', (req, res) => {
  res.send('🚀 Máquina de Campanha IA está ativa!');
});

module.exports = app;
