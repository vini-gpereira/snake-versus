import { boundMethod } from "autobind-decorator";

class Watcher {
  constructor() {
    this.observers = [];
  }

  @boundMethod
  subscribe(f) {
    this.observers.push(f);
  }

  @boundMethod
  unsubscribe(f) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  @boundMethod
  notify(command) {
    this.observers.forEach((subscriber) => subscriber(command));
  }
}

export default Watcher;
