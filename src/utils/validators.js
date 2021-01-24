// eslint-disable-next-line import/prefer-default-export
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
