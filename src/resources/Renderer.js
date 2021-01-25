class Renderer {
  constructor({ gameSettings }) {
    this.screen = gameSettings.screen;
    this.ctx = gameSettings.context;
    this.pixel = gameSettings.pixel;
    this.entitySize = gameSettings.entitySize;
    this.currentPlayerId = gameSettings.currentPlayerId;

    this.renderScreen = this.renderScreen.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
  }

  renderScreen(players, foods) {
    this.clearScreen();

    Object.keys(players).forEach((id) => {
      const player = players[id];

      if (id === this.currentPlayerId) {
        this.ctx.fillStyle = 'blue';
      } else {
        this.ctx.fillStyle = 'black';
      }

      this.ctx.fillRect(
        player.x * this.pixel,
        player.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    });

    Object.values(foods).forEach((food) => {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(
        food.x * this.pixel,
        food.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    });

    window.requestAnimationFrame(() => {
      this.renderScreen(players, foods);
    });
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
  }
}

export default Renderer;
