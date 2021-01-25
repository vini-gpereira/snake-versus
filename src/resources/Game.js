import { boundMethod } from 'autobind-decorator';
import randint from '../utils/generators.js';
import { isPositionFree } from '../utils/validators.js';

class Game {
  constructor({ gameSettings, actions, renderer }) {
    this.boardSize = gameSettings.boardSize;
    this.actions = actions;
    this.renderer = renderer;
    this.state = {
      scores: {},
      players: {},
      foods: {},
    };
  }

  @boundMethod
  createGame(playerIds) {
    playerIds.forEach((playerId) => {
      const position = this.randomFreePosition();
      this.addOrUpdatePlayer({ playerId, ...position });
      this.addScore(playerId);
    });
  }

  @boundMethod
  startGame() {
    this.renderer.renderScreen(this.state.players, this.state.foods);
  }

  @boundMethod
  playerCommand(command) {
    const { playerId, key } = command;
    const player = this.state.players[playerId];

    if (player) {
      const { x, y } = this.actions.executeAction(player, key);
      this.addOrUpdatePlayer({ playerId, x, y });
      this.checkForFoodCollision(playerId);
    }
  }

  @boundMethod
  addScore(command) {
    const { playerId } = command;

    if (!playerId || typeof this.state.scores[playerId] === 'number') {
      this.state.scores[playerId] = 0;
    }
  }

  @boundMethod
  removeScore(command) {
    const { playerId } = command;
    delete this.state.scores[playerId];
  }

  @boundMethod
  incrementScore(command) {
    const { playerId } = command;

    if (playerId && typeof this.state.scores[playerId] === 'number') {
      this.state.scores[playerId] += 1;
    }
  }

  @boundMethod
  addOrUpdatePlayer(command) {
    const { playerId, x, y } = command;
    this.state.players[playerId] = { x, y };
  }

  @boundMethod
  removePlayer(command) {
    const { playerId } = command;
    this.scores.removePlayerScore(playerId);
    delete this.state.players[playerId];
  }

  @boundMethod
  addFood(command) {
    const { foodId, x, y } = command;
    this.state.foods[foodId] = { x, y };
  }

  @boundMethod
  removeFood(command) {
    const { foodId } = command;
    delete this.state.players[foodId];
  }

  @boundMethod
  checkForFoodCollision(playerId) {
    const { x, y } = this.state.players[playerId];
    const { foods } = this.state;

    const collidedFoodId = Object.keys(foods).find((foodId) => {
      const food = foods[foodId];
      return food.x === x && food.y === y;
    });

    if (collidedFoodId) {
      this.removeFood({ collidedFoodId });
      this.incrementScore({ playerId });
    }
  }

  @boundMethod
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
