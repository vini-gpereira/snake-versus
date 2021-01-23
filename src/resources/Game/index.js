import randint from '../../utils/generators';
import { isPositionFree, isSamePlayer } from '../../utils/validators';

class Game {
  constructor({ gameSettings, actions, renderer }) {
    this.boardSize = gameSettings.boardSize;
    this.actions = actions;
    this.renderer = renderer;
    this.state = {
      players: {},
      foods: {},
    };
  }

  buildInitialState(players) {
    players.forEach((player) => {
      this.state.players[player] = this.randomFreePosition();
    });
  }

  playerCommand(command) {
    const { playerId, key } = command;
    const player = this.state.players[playerId];
    const newPlayer = this.actions.executeAction(player, key);

    if (!isSamePlayer(player, newPlayer)) {
      this.state.players[playerId] = newPlayer;
      this.renderer.clearScreen();
      this.renderer.renderScreen(this.state.players, this.state.foods);
    }
  }

  startGame() {
    this.renderer.renderScreen(this.state.players, this.state.foods);
  }

  randomFreePosition() {
    const min = 0;
    const max = this.boardSize - 1;
    const { players, foods } = this.state;

    let x = randint(min, max);
    let y = randint(min, max);

    while (!isPositionFree(x, y, players, foods)) {
      x = randint(min, max);
      y = randint(min, max);
    }

    return { x, y };
  }
}

export default Game;
