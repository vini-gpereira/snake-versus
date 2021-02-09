class Renderer {
  constructor() {
    this.pixel = 10;
    this.entitySize = 10;
  }

  renderScreen(screen, gameState, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d');
    context.clearRect(0, 0, screen.width, screen.height);

    const { players, foods } = gameState;

    context.fillStyle = 'black';

    Object.keys(players).forEach((id) => {
      const player = players[id];

      context.fillRect(
        player.x * this.pixel,
        player.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    });

    context.fillStyle = 'red';

    Object.values(foods).forEach((food) => {
      context.fillRect(
        food.x * this.pixel,
        food.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    });

    const currentPlayer = players[currentPlayerId];

    if (currentPlayer) {
      context.fillStyle = 'blue';
      context.fillRect(
        currentPlayer.x * this.pixel,
        currentPlayer.y * this.pixel,
        this.entitySize,
        this.entitySize
      );
    }

    requestAnimationFrame(() => {
      this.renderScreen(
        screen,
        gameState,
        requestAnimationFrame,
        currentPlayerId
      );
    });
  }
}

export default Renderer;
