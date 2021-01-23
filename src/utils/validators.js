export function isPositionFree(x, y, players, foods) {
  const hasPlayer = Object.values(players).find(
    (player) => player.x === x && player.y === y
  );

  if (hasPlayer) {
    return false;
  }

  const hasFood = Object.values(foods).forEach(
    (food) => food.x === x && food.y === y
  );

  if (hasFood) {
    return false;
  }

  return true;
}

export function isSamePlayer(player1, player2) {
  if (player1 === player2) {
    return true;
  }

  if (!(player1 instanceof Object) || !(player2 instanceof Object)) {
    return false;
  }

  if (Object.keys(player1).length !== Object.keys(player2).length) {
    return false;
  }

  const hasDifferentValue = Object.keys(player1).find((key) => {
    const valPlayer1 = player1[key];
    const valPlayer2 = player2[key];

    if (!valPlayer2 || valPlayer1 !== valPlayer2) {
      return true;
    }
  });

  if (hasDifferentValue) {
    return false;
  }

  return true;
}
