import Listener from './resources/Listener.js';
import Renderer from './resources/Renderer.js';
import Game from './resources/Game.js';

// eslint-disable-next-line no-undef
const socket = io();

const listener = new Listener({ document });
const renderer = new Renderer();
const game = new Game();

socket.on('connect', () => {
  const currentPlayerId = socket.id;
  const screen = document.getElementById('screen');

  renderer.renderScreen(
    screen,
    game.getState(),
    window.requestAnimationFrame,
    currentPlayerId
  );
});

socket.on('setup', (state) => {
  const currentPlayerId = socket.id;

  game.setState(state);

  listener.setCurrentPlayerId(currentPlayerId);
  listener.subscribe(game.playerCommand);
  listener.subscribe((command) => {
    socket.emit('player-command', command);
  });
});

socket.on('add-player', (command) => {
  game.addPlayer(command);
});

socket.on('update-player', (command) => {
  game.updatePlayer(command);
});

socket.on('remove-player', (command) => {
  game.removePlayer(command);
});

socket.on('player-command', (command) => {
  const currentPlayerId = socket.id;

  if (currentPlayerId !== command.playerId) {
    game.playerCommand(command);
  }
});

socket.on('add-food', (command) => {
  game.addFood(command);
});

socket.on('remove-food', (command) => {
  game.removeFood(command);
});
