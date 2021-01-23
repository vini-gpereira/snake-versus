const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')
const pixel = 10
const size = pixel

const game = {
  players: {
    'player1': { x: 10, y: 20 }
  },
  foods: {
    'food1': { x: 37, y: 23 },
    'food2': { x: 17, y: 45 }
  }
}

renderGame()

function renderGame() {
  const { players, foods } = game
  
  ctx.fillStyle = 'black'

  for (playerId in players) {
    console.log(`Player ${playerId} joined the game...`)
    const playerPosition = players[playerId]
    ctx.fillRect(playerPosition.x * pixel, playerPosition.y * pixel, size, size)
  }

  ctx.fillStyle = 'blue'
  
  for (foodId in foods) {
    console.log(`Food ${foodId} has been spawned...`)
    const foodPosition = foods[foodId]
    ctx.fillRect(foodPosition.x * pixel, foodPosition.y * pixel, size, size)
  }
}
