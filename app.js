const express = require("express");
const app = express();
const dotenv = require("dotenv");
const campaignRoutes = require("./routes/campaignRoutes");

dotenv.config();
app.use(express.json());

// Rotas
app.use("/api/campaign", campaignRoutes);

// Inicialização
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});