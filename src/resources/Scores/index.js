class Scores {
  constructor() {
    this.scores = {};
  }

  addPlayerScore(playerId) {
    if (playerId) {
      this.scores[playerId] = 0;
    }
  }

  removePlayerScore(playerId) {
    delete this.scores[playerId];
  }

  incrementScore(playerId) {
    if (typeof this.scores[playerId] === 'number') {
      this.scores[playerId] += 1;
    }
  }
}

export default Scores;
