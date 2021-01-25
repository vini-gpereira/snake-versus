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

    this.createGame = this.createGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.playerCommand = this.playerCommand.bind(this)
    this.addOrUpdatePlayer = this.addOrUpdatePlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
    this.addFood = this.addFood.bind(this)
    this.removeFood = this.removeFood.bind(this)
    this.addScore = this.addScore.bind(this)
    this.removeScore = this.removeScore.bind(this)
    this.incrementScore = this.incrementScore.bind(this)
    this.checkForFoodCollision = this.checkForFoodCollision.bind(this)
    this.randomFreePosition = this.randomFreePosition.bind(this)
  }

  createGame(playerIds) {
    playerIds.forEach((playerId) => {
      const position = this.randomFreePosition();
      this.addOrUpdatePlayer({ playerId, ...position });
      this.addScore(playerId);
    });
  }

  startGame() {
    this.renderer.renderScreen(this.state.players, this.state.foods);
  }

  playerCommand(command) {
    const { playerId, key } = command;
    const player = this.state.players[playerId];

    if (player) {
      const { x, y } = this.actions.executeAction(player, key);
      this.addOrUpdatePlayer({ playerId, x, y });
      this.checkForFoodCollision(playerId);
    }
  }

  addScore(command) {
    const { playerId } = command;

    if (!playerId || typeof this.state.scores[playerId] === 'number') {
      this.state.scores[playerId] = 0;
    }
  }

  removeScore(command) {
    const { playerId } = command;
    delete this.state.scores[playerId];
  }

  incrementScore(command) {
    const { playerId } = command;

    if (playerId && typeof this.state.scores[playerId] === 'number') {
      this.state.scores[playerId] += 1;
    }
  }

  addOrUpdatePlayer(command) {
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
