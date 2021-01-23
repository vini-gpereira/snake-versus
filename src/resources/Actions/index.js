class Actions {
  constructor({ gameSettings }) {
    this.actions = {
      ArrowUp(player) {
        const newY = (player.y - 1) % gameSettings.boardSize;
        return { ...player, y: newY };
      },
      ArrowDown(player) {
        const newY = (player.y + 1) % gameSettings.boardSize;
        return { ...player, y: newY };
      },
      ArrowRight(player) {
        const newX = (player.x + 1) % gameSettings.boardSize;
        return { ...player, x: newX };
      },
      ArrowLeft(player) {
        const newX = (player.x - 1) % gameSettings.boardSize;
        return { ...player, x: newX };
      },
    };
  }

  executeAction(player, key) {
    const action = this.actions[key];
    return action ? action(player) : player;
  }

  addOrModifyAction(key, action) {
    this.actions[key] = action;
  }
}

export default Actions;
