class Listener {
  constructor({ gameSettings, watcher }) {
    this.playerId = gameSettings.currentPlayerId;
    this.watcher = watcher;

    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const command = {
      playerId: this.playerId,
      key: event.key,
    };

    this.watcher.notify(command);
  }
}

export default Listener;
