const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // pour autoriser tous les clients
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté :', socket.id);

  socket.on('send_message', (data) => {
    console.log('Message reçu:', data);
    // renvoyer à tous les clients (y compris l'envoyeur)
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté :', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Serveur Socket.IO en écoute sur le port 3000');
});
