class Listener {
  constructor({ document }) {
    this.observers = [];
    this.currentPlayerId = null;

    this.handleInput = this.handleInput.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.notify = this.notify.bind(this);
    document.addEventListener('keydown', this.handleInput);
  }

  setCurrentPlayerId(id) {
    this.currentPlayerId = id;
  }

  handleInput(event) {
    const command = {
      playerId: this.currentPlayerId,
      key: event.key,
    };

    this.notify(command);
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
}

export default Listener;
