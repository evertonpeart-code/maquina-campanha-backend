const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Máquina de Campanha IA está online 🚀');
});

app.post('/gerar-campanha', async (req, res) => {
  const { produto, urlProduto, urlAfiliado } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ sucesso: false, erro: 'API KEY não configurada no servidor.' });
  }

  if (!produto || !urlProduto || !urlAfiliado) {
    return res.status(400).json({ sucesso: false, erro: 'Campos obrigatórios ausentes.' });
  }

  try {
    const resposta = {
      sucesso: true,
      campanha: {
        titulo: `Campanha para ${produto}`,
        urlProduto,
        urlAfiliado,
        anuncios: [
          {
            titulo: `Compre ${produto} com Desconto`,
            descricao: `Oferta especial para ${produto}. Aproveite já!`,
            url: urlAfiliado
          }
        ]
      }
    };

    res.json(resposta);
  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: 'Erro ao gerar campanha com a IA.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});