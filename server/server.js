// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log("✅ Client connecté");

    ws.on('message', message => {
        console.log("📩 Message reçu :", message);

        // Broadcast à tous les clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log("❌ Client déconnecté"));
});

console.log("🚀 Serveur WebSocket sur ws://localhost:8080");
