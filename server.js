const express = require("express");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir a pasta raiz
app.use(express.static(__dirname));

function pingServer() {
  https.get("https://segmenta-ofront.onrender.com", (res) => {
    console.log(`Ping enviado - Status: ${res.statusCode} - ${new Date().toLocaleTimeString()}`);
  }).on("error", (err) => {
    console.error("Erro no ping:", err.message);
  });
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Executa um ping ao iniciar
  pingServer();

  // Executa a cada 1 minuto
  setInterval(pingServer, 60000);
});
