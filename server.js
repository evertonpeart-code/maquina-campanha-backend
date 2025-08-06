// server.js
// Arquivo principal que inicializa o servidor e carrega variáveis de ambiente

require('dotenv').config(); // Carrega as variáveis do .env

const app = require('./app'); // Importa a aplicação configurada
const port = process.env.PORT || 3000; // Usa a porta do .env ou a 3000 como padrão

// Validação da chave da IA (OpenRouter)
if (!process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️  AVISO: A variável OPENROUTER_API_KEY não está definida no .env');
}

// Inicia o servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${port}`);
});
