import randint from '../utils/generators.js';
import { isPositionFree } from '../utils/validators.js';
import { mod } from '../utils/operators.js';

class Game {
  constructor() {
    this.actions = {
      ArrowUp(player) {
        const newY = mod(player.y - 1, 50);
        return { ...player, y: newY };
      },
      ArrowDown(player) {
        const newY = mod(player.y + 1, 50);
        return { ...player, y: newY };
      },
      ArrowRight(player) {
        const newX = mod(player.x + 1, 50);
        return { ...player, x: newX };
      },
      ArrowLeft(player) {
        const newX = mod(player.x - 1, 50);
        return { ...player, x: newX };
      },
    };
    this.board = {
      height: 50,
      width: 50,
    };
    this.state = {
      scores: {},
      players: {},
      foods: {},
    };
    this.observers = [];

    this.playerCommand = this.playerCommand.bind(this);
    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addFood = this.addFood.bind(this);
    this.removeFood = this.removeFood.bind(this);
    this.addScore = this.addScore.bind(this);
    this.removeScore = this.removeScore.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.notify = this.notify.bind(this);
    this.checkForFoodCollision = this.checkForFoodCollision.bind(this);
    this.randomFreePosition = this.randomFreePosition.bind(this);
  }

  start() {
    const frequency = 3000;

    setInterval(this.addFood, frequency);
  }

  playerCommand(command) {
    const { playerId, key } = command;
    const player = this.state.players[playerId];

    if (player) {
      const action = this.actions[key];

      if (action) {
        const { x, y } = action(player);
        this.updatePlayer({ playerId, x, y });
        this.checkForFoodCollision(playerId);
      }
    }
  }

  setState(newState) {
    Object.assign(this.state, newState);
  }

  getState() {
    return this.state;
  }

  addPlayer(command) {
    const { playerId } = command;
    const { x, y } = this.randomFreePosition();
    this.state.players[playerId] = { x, y };

    this.notify({
      type: 'add-player',
      playerId,
      x,
      y,
    });
  }

  updatePlayer(command) {
    const { playerId, x, y } = command;
    const player = this.state.players[playerId];
    this.state.players[playerId] = { ...player, x, y };

    this.notify({
      type: 'update-player',
      playerId,
      x,
      y,
    });
  }

  removePlayer(command) {
    const { playerId } = command;
    this.removeScore(playerId);
    delete this.state.players[playerId];

    this.notify({
      type: 'remove-player',
      playerId,
    });
  }

  addFood(command) {
    const { foodId } = command;
    const { x, y } = this.randomFreePosition();
    this.state.foods[foodId] = { x, y };

    this.notify({
      type: 'add-food',
      foodId,
      x,
      y,
    });
  }

  removeFood(command) {
    const { foodId } = command;
    delete this.state.foods[foodId];

    this.notify({
      type: 'remove-food',
      foodId,
    });
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

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  notify(command) {
    this.observers.forEach((subscriber) => subscriber(command));
  }

  checkForFoodCollision(playerId) {
    const { x, y } = this.state.players[playerId];
    const { foods } = this.state;

    const collidedFoodId = Object.keys(foods).find((foodId) => {
      const food = foods[foodId];
      return food.x === x && food.y === y;
    });

    if (collidedFoodId) {
      this.removeFood({ foodId: collidedFoodId });
      this.incrementScore({ playerId });
    }
  }

  randomFreePosition() {
    const min = 0;
    const maxH = this.board.height - 1;
    const maxW = this.board.width - 1;
    const { players, foods } = this.state;

    let x = randint(min, maxW);
    let y = randint(min, maxH);

    while (!isPositionFree(x, y, players, foods)) {
      x = randint(min, maxW);
      y = randint(min, maxH);
    }

    return { x, y };
  }
}

export default Game;
