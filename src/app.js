const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')
const screenSize = 50
const pixel = screen.scrollHeight / screenSize
const entitySize = pixel

const currentPlayerId = 'player1'

const game = {
  players: {
    'player1': { x: 10, y: 20 }
  },
  foods: {}
}

document.addEventListener('keydown', handleKeyDown)

function startGame() {
  generateRandomFoods(10)
  renderScreen()
}

function handleKeyDown(event) {
  const actions = {
    'ArrowUp': moveUp,
    'ArrowDown': moveDown,
    'ArrowRight': moveRight,
    'ArrowLeft': moveLeft
  }

  const action = actions[event.key]

  if (action) {
    action()
    renderScreen()
  }
}

function moveUp() {
  const player = game.players[currentPlayerId]
  const newY = (player.y - 1) % screenSize
  
  player.y = newY
  
  game.players[currentPlayerId] = player
}

function moveDown() {
  const player = game.players[currentPlayerId]
  const newY = (player.y + 1) % screenSize
  
  player.y = newY
  
  game.players[currentPlayerId] = player
}

function moveRight() {
  const player = game.players[currentPlayerId]
  const newX = (player.x + 1) % screenSize
  
  player.x = newX
  
  game.players[currentPlayerId] = player
}

function moveLeft() {
  const player = game.players[currentPlayerId]
  const newX = (player.x - 1) % screenSize
  
  player.x = newX
  
  game.players[currentPlayerId] = player
}

function generateRandomFoods(n) {
  for (let i = 1; i <= n; i++) {
    x = randint(0, screenSize - 1)
    y = randint(0, screenSize - 1)
    
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

  for (foodId in foods) {
    const food = foods[foodId]

    if (food.x === x && food.y === y) {
      return false
    }
  }

  for (playerId in players) {
    const player = players[playerId]

    if (player.x === x && player.y === y) {
      return false
    }
  }

  return true
}

function renderScreen() {
  const { players, foods } = game

  ctx.clearRect(0, 0, screen.width, screen.height)
  
  ctx.fillStyle = 'black'

  for (const playerId in players) {
    const player = players[playerId]
    ctx.fillRect(player.x * pixel, player.y * pixel, entitySize, entitySize)
  }

  ctx.fillStyle = 'blue'
  
  for (const foodId in foods) {
    const food = foods[foodId]
    ctx.fillRect(food.x * pixel, food.y * pixel, entitySize, entitySize)
  }
}

startGame()