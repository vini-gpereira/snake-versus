import Watcher from './resources/Watcher.js';
import Listener from './resources/Listener.js';
import Actions from './resources/Actions.js';
import Renderer from './resources/Renderer.js';
import Game from './resources/Game.js';

// eslint-disable-next-line no-undef
const socket = io();

const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const pixel = 10;
const entitySize = pixel;
const board = {
  height: screen.scrollHeight / pixel,
  width: screen.scrollWidth / pixel,
};
const currentPlayerId = 'player1';

const gameSettings = {
  screen,
  context,
  pixel,
  board,
  entitySize,
  currentPlayerId,
};

const watcher = new Watcher();
const listener = new Listener({ gameSettings, watcher });
const actions = new Actions({ gameSettings });
const renderer = new Renderer({ gameSettings });
const game = new Game({
  gameSettings,
  actions,
  renderer,
});

document.addEventListener('keydown', listener.handleInput);

watcher.subscribe(game.playerCommand);

game.startGame();

socket.on('connect', () => {
  const playerId = socket.id;
  console.log(`> Player connected on Client with id: ${playerId}`);
});
