import randint from '../../utils/generators';
import { isPositionFree, isSamePlayer } from '../../utils/validators';

class Game {
  // eslint-disable-next-line object-curly-newline
  constructor({ gameSettings, actions, renderer, scores }) {
    this.boardSize = gameSettings.boardSize;
    this.actions = actions;
    this.renderer = renderer;
    this.scores = scores;
    this.state = {
      players: {},
      foods: {},
    };
  }

  createGame(playerIds) {
    playerIds.forEach((playerId) => {
      const position = this.randomFreePosition();
      this.addPlayer({ playerId, ...position });
      this.scores.addPlayerScore(playerId);
    });
  }

  startGame() {
    this.renderer.renderScreen(this.state.players, this.state.foods);
  }

  playerCommand(command) {
    const { playerId, key } = command;
    const player = this.state.players[playerId];

    if (player) {
      const newPlayer = this.actions.executeAction(player, key);

      if (!isSamePlayer(player, newPlayer)) {
        this.state.players[playerId] = newPlayer;
        this.renderer.clearScreen();
        this.checkForFruitCollision(playerId);
        this.renderer.renderScreen(this.state.players, this.state.foods);
      }
    }
  }

  addPlayer(command) {
    const { playerId, x, y } = command;
    this.state.players[playerId] = { x, y };
  }

  removePlayer(command) {
    const { playerId } = command;
    this.scores.removePlayerScore(playerId);
    delete this.state.players[playerId];
  }

  addFood(command) {
    const { foodId, x, y } = command;
    this.state.foods[foodId] = { x, y };
  }

  removeFood(command) {
    const { foodId } = command;
    delete this.state.players[foodId];
  }

  checkForFruitCollision(playerId) {
    const { x, y } = this.state.players[playerId];
    const { foods } = this.state;

    const collidedFoodId = Object.keys(foods).find((foodId) => {
      const food = foods[foodId];
      return food.x === x && food.y === y;
    });

    if (collidedFoodId) {
      this.removeFood(collidedFoodId);
      this.scores.incrementScore(playerId);
    }
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
