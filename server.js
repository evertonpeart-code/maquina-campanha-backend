require('dotenv').config();
const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', campaignRoutes);

app.get('/', (req, res) => {
  res.send('Máquina de Campanha IA está ativa 🚀');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
