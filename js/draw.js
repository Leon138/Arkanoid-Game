import { canvas, context, bricksArr } from "./main.js";
import { ball, platform, bricks } from "./game-object.js";
import { gameState } from "./game-object.js";

export const loadImage = src => {
  const img = new Image();
  img.src = src;
  return img;
};

export const images = {
  brickFull: loadImage('./images/brick.png'),
  brickDamaged: loadImage('./images/brick2.png'),
  ball: loadImage('./images/ball.png'),
  platform: loadImage('./images/platform.png'),
  background: loadImage('./images/background.png'),
  gameOver: loadImage('./images/you_lose1.png'),
  backgroundBtn: loadImage('./images/btn.png'),
}

export const drawBricks = () => {
  for (const column of bricksArr) {
    for (const brick of column) {
      if  (brick.status > 0) { 
        let image;
        if  (brick.status === 2) {
          image = images.brickFull; 
        } else if (brick.status === 1) {
          image = images.brickDamaged;
        }
        context.drawImage(image, brick.x, brick.y, bricks.width, bricks.height);
      }
    }
  }
}

export const drawBackground = () => {
  context.drawImage(images.background, -28, -27, canvas.width + 55, canvas.height + 55);
}

export const drawBall = () => {
  context.beginPath();
  context.drawImage(images.ball, ball.x - ball.radius, ball.y);
  context.fill();
  context.closePath();
}

export const drawPlatform = () => {
  context.drawImage(images.platform, platform.x, platform.y, platform.width, platform.height)
}

export const drawScoreLivesLevel = () => {
  context.font = '16px Verdana';
  context.fillStyle = "#FFF";
  context.fillText('Score: ' + gameState.score, 8, 30);
  context.fillText('Lives: ' + gameState.lives, canvas.width - 80, 30);
  context.fillText('Level: ' + gameState.currentLevel, canvas.width / 2, 30);
}

export const drawButton = (x, y, text) => {
  context.drawImage(images.backgroundBtn, x, y);
  context.fillRect(x, y, 0, 0);
  context.fillStyle = '#FFF';
  context.font = '20px Arial';
  context.fillText(text, x + 80, y + 60);
};

export const drawMessage = () => {
  context.fillStyle = "#FFF";
  context.font = "32px Arial";
  const message = gameState.hasWon ? "YOU WIN!" : "GAME OVER";
  context.fillText(message, canvas.width / 2 - 60, canvas.height / 2 - 150);
};