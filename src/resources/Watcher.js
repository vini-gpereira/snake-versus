class Watcher {
  constructor() {
    this.observers = [];

    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.notify = this.notify.bind(this)
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
