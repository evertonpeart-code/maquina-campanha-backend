// server.js
require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;

if (!process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️  AVISO: A variável OPENROUTER_API_KEY não está definida no .env');
}

app.listen(port, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${port}`);
});
