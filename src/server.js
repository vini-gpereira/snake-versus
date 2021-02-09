import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import Game from './resources/Game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const port = 3000;

const game = new Game();

game.subscribe((command) => {
  sockets.emit(command.type, command);
});

app.use(express.static(__dirname));

sockets.on('connection', (socket) => {
  const playerId = socket.id;

  game.addPlayer({ playerId });

  socket.emit('setup', game.getState());

  socket.on('disconnect', () => {
    game.removePlayer({ playerId });
  });

  socket.on('player-command', (command) => {
    const newCommand = {
      ...command,
      playerId,
      type: 'player-command',
    };

    game.playerCommand(newCommand);
  });
});

server.listen(port, () => {
  console.log('> Server running on port: 3000');
});
