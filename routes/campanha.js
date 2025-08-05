const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Gera campanha com base nos dados enviados
router.post('/', async (req, res) => {
  const { produto, url, afiliado } = req.body;

  if (!produto || !url || !afiliado) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
  }

  try {
    const prompt = `
Crie uma campanha Google Ads com base nestes dados:
Produto: ${produto}
URL oficial: ${url}
URL do afiliado: ${afiliado}

Gere títulos, descrições, palavras-chave, sitelinks e snippets prontos para copiar e colar.
Formato organizado. Copwriting forte. Alta conversão.
`;

    const completion =
