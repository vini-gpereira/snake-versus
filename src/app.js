import Watcher from './resources/Watcher.js';
import Listener from './resources/Listener.js';
import Actions from './resources/Actions.js';
import Renderer from './resources/Renderer.js';
import Game from './resources/Game.js';

const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const boardSize = 50;
const pixel = screen.scrollHeight / boardSize;
const entitySize = pixel;
const currentPlayerId = 'player1';

const gameSettings = {
  screen,
  context,
  boardSize,
  pixel,
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

const players = ['player1', 'player2', 'player3', 'player4'];

game.createGame(players);
game.startGame();
