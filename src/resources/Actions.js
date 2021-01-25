import { mod } from '../utils/operators.js';

class Actions {
  constructor({ gameSettings }) {
    this.actions = {
      ArrowUp(player) {
        const newY = mod(player.y - 1, gameSettings.boardSize);
        return { ...player, y: newY };
      },
      ArrowDown(player) {
        const newY = mod(player.y + 1, gameSettings.boardSize);
        return { ...player, y: newY };
      },
      ArrowRight(player) {
        const newX = mod(player.x + 1, gameSettings.boardSize);
        return { ...player, x: newX };
      },
      ArrowLeft(player) {
        const newX = mod(player.x - 1, gameSettings.boardSize);
        return { ...player, x: newX };
      },
    };

    this.executeAction = this.executeAction.bind(this);
  }

  executeAction(player, key) {
    const action = this.actions[key];
    return action ? action(player) : player;
  }
}

export default Actions;
