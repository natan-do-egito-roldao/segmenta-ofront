const https = require("https");

function pingServer() {
    https.get("https://segmenta-ofront.onrender.com", (res) => {
        console.log(`Ping enviado - Status: ${res.statusCode} - ${new Date().toLocaleTimeString()}`);
    }).on("error", (err) => {
        console.error("Erro no ping:", err.message);
    });
}

// Executa imediatamente
pingServer();

// Executa a cada 1 minuto (60000ms)
setInterval(pingServer, 60000);