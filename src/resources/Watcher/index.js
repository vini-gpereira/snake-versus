class Watcher {
  constructor() {
    this.observers = [];
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

export default Watcher;
