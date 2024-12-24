import { drawBricks, drawBackground, drawBall, drawButton, drawMessage, drawPlatform, drawScoreLivesLevel, images } from './draw.js';
import { gameState, ball, bricks, platform } from './game-object.js';
import { collisionDetection } from './collision.js';
import { addButtonHandlers, handleTouch } from './controls.js';

export const canvas = document.getElementById('arkanoid');
export const context = canvas.getContext('2d');
const menu = document.getElementById('menu');
const playBtn = document.getElementById('menu-button');

export let bricksArr = [];

export const loadSound = src => {
  const audio = new Audio(src);
  audio.play();
};

export const createBricks = (level) => {
  const { rows, columns } = gameState.levels[level];
  bricksArr = [];
  for (let col = 0; col < columns; col++) {
    bricksArr[col] = [];
    for (let row = 0; row < rows; row++) {
        bricksArr[col][row] = { 
        x: col * (bricks.width + bricks.padding) + bricks.leftOffset,
        y: row * (bricks.height + bricks.padding) + bricks.topOffset,
        status: 2,
      };
    }
  }
}

export const checkLevelCompletion = () => {
  const allBricksDestroyed = bricksArr.every(column => 
    column.every(brick => brick.status === 0)
  );

  if (allBricksDestroyed) {
    gameState.currentLevel++;
      
    if (gameState.currentLevel >= gameState.levels.length) {
      gameState.hasWon = true;
      gameOver();
    } else {
      createBricks(gameState.currentLevel);
      resetBall();
    }
  } 
};

export const gameOver = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameState.gameOver = true;
  context.drawImage(images.gameOver, -52, -50, canvas.width + 108, canvas.height + 90);
  loadSound('../assets/lose.wav');
  drawMessage();
  drawButton(canvas.width / 2 - 100, 200, 'Back to menu');
  drawButton(canvas.width / 2 - 100, 340, 'Play again');
  addButtonHandlers();
}

export const resetBall = () => {
  ball.x = platform.x + platform.width / 2;
  ball.y = platform.y - 20;
  ball.dx = 0;
  ball.dy = 0;
  platform.isBall = false;
};

export const update = () => {
  if (platform.isBall) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    if  (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
    }
    
    if  (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    }
    
    if  (ball.y + ball.radius >= platform.y && 
        ball.x + ball.radius >= platform.x && 
        ball.x <= platform.x + platform.width) 
      {
        let hitPosition = (ball.x - (platform.x + platform.width / 2)) / (platform.width / 2);
        ball.dy = -ball.dy;
        ball.dx = hitPosition * 4;
      }
      
      if  (ball.y > platform.y + platform.height) {
        gameState.lives--;
        if(!gameState.lives) {
          gameOver();
        }
        else {
          resetBall();
        }
      }
  }
}
  
export const load = () => {
  drawBackground();
  drawBricks();
  drawBall();
  drawPlatform();
  drawScoreLivesLevel();
  update();
}

export const gameLoop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!gameState.gameOver) {
    load();
    collisionDetection();
    requestAnimationFrame(gameLoop);
  } else gameOver() 
}

export const restartGame = () =>  {
  gameState.gameOver = false;
  gameState.lives = 3;
  gameState.score = 0;
  gameState.currentLevel = 0;
  createBricks(gameState.currentLevel);
  resetBall();
  gameLoop();
};

export const init = () => {
  menu.style.display = 'none'; 
  canvas.style.display = 'block';
  gameState.currentLevel = 1; 
  gameState.lives = 3; 
  gameState.score = 0; 
  gameState.gameOver = false;
  createBricks(gameState.currentLevel);
  resetBall();
  gameLoop();
}
  
playBtn.addEventListener('click', init);

canvas.addEventListener('mousemove', event => {
  let mouseX = event.clientX - canvas.offsetLeft;
  let mouseY = event.clientY - canvas.offsetTop;

  if  (mouseX > platform.width / 2 && mouseX < canvas.width - platform.width / 2) {
    platform.x = mouseX - platform.width / 2;
  }
  if  (!platform.isBall) {
    ball.x = platform.x + platform.width / 2;
  }

  if  ((gameState.gameOver) && (mouseX >= 351 && mouseX <= 520 && mouseY >= 220 && mouseY <= 275) || 
    (gameState.gameOver) && (mouseX >= 365 && mouseX <= 500 && mouseY >= 370 && mouseY <= 420)) {
    document.body.style.cursor = 'pointer';
    } else document.body.style.cursor = 'default';
});

canvas.addEventListener('mousedown', () => {
  if (!platform.isBall) {
    platform.isBall = true; 
    ball.dx = 2;
    ball.dy = -3; 
  }
});

canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', handleTouch);

gameLoop();
