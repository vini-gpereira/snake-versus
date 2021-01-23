const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')
const maxPixel = 49
const minPixel = 0
const pixel = screen.scrollHeight / (maxPixel - minPixel + 1)
const size = pixel

const game = {
  players: {
    'player1': { x: 10, y: 20 }
  },
  foods: {}
}

generateRandomFoods(10)
renderGame()

function renderGame() {
  const { players, foods } = game
  
  ctx.fillStyle = 'black'

  for (playerId in players) {
    const player = players[playerId]
    console.log(`Player ${playerId} joined the game in (${player.x}, ${player.y})`)
    ctx.fillRect(player.x * pixel, player.y * pixel, size, size)
  }

  ctx.fillStyle = 'blue'
  
  for (foodId in foods) {
    const food = foods[foodId]
    console.log(`Food ${foodId} has been spawned in (${food.x}, ${food.y})`)
    ctx.fillRect(food.x * pixel, food.y * pixel, size, size)
  }
}


function generateRandomFoods(n) {
  for (let i = 1; i <= n; i++) {
    x = randint(minPixel, maxPixel)
    y = randint(minPixel, maxPixel)
    
    if (isPositionEmpty(x, y)) {
      const foodId = `food${i}`
      game.foods[foodId] = { x, y }
    }
  }
}

function randint(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isPositionEmpty(x, y) {
  const { players, foods } = game

  for (playerId in players) {
    const player = players[playerId]

    if (player.x === x && player.y === y) {
      return false
    }
  }

  for (foodId in foods) {
    const food = foods[foodId]

    if (food.x === x && food.y === y) {
      return false
    }
  }

  return true
}