const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para servir arquivos estáticos da pasta raiz (onde está index.html)
app.use(express.static(__dirname));

// Rota principal (GET /)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Exemplo de rota modular (futuramente pode ter mais)
const homeRoute = require('./routes/home');
app.use('/api', homeRoute);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});


