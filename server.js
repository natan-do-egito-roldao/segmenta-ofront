const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir a pasta raiz
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
