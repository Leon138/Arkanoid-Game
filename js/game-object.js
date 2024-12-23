export const gameState = {
  lives: 3,
  score: 0,
  gameOver: false,
  isMenu: true,
  hasWon: false,
  levels: [
    { rows: 0, columns: 0 },
    { rows: 2, columns: 8 },
    { rows: 3, columns: 9 },
    { rows: 4, columns: 10 },
  ],
  currentLevel: 0,
}

export const platform = {
  x: 350,
  y: 500,
  height: 15,
  width: 80,
  radius: 9,
  isBall: false,
}

export const ball = {
  x: 390, 
  y: 480, 
  dx: 0,
  dy: 0,
  radius: 8,
}

export const bricks = {
  height: 50,
  width: 50,
  padding: 15,
  topOffset: 40,
  leftOffset: 110,
}