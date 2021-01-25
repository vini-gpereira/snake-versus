class Renderer {
  constructor({ gameSettings }) {
    this.screen = gameSettings.screen;
    this.ctx = gameSettings.context;
    this.pixel = gameSettings.pixel;
    this.entitySize = gameSettings.entitySize;

    this.renderScreen = this.renderScreen.bind(this)
    this.clearScreen = this.clearScreen.bind(this)
  }

  renderScreen(players, foods) {
    this.clearScreen();

    this.ctx.fillStyle = 'black';

    Object.values(players).forEach((player) => {
      this.ctx.fillRect(
        player.x * this.pixel,
        player.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    });

    this.ctx.fillStyle = 'blue';

    Object.values(foods).forEach((food) => {
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