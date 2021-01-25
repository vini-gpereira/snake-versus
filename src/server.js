import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const port = 3000;

app.use(express.static(__dirname));

sockets.on('connection', (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected on Server with id: ${playerId}`);
});

server.listen(port, () => {
  console.log('> Server running on port: 3000');
});
