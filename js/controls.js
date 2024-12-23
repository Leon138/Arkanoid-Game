import { canvas, restartGame } from "./main.js";
import { gameState, platform, ball } from "./game-object.js";

export const addButtonHandlers = () => {
  canvas.addEventListener('mousedown', handleButtonClick);
  canvas.addEventListener('touchstart', handleButtonClick);
};
export const handleButtonClick = event => {
  let mouseX;
  let mouseY;

  if (event.clientX) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
  } else if (event.touches && event.touches.length > 0) {
    mouseX = event.touches[0].clientX - canvas.offsetLeft;
    mouseY = event.touches[0].clientY - canvas.offsetTop;
  }

  if (gameState.gameOver) {
    if (mouseX >= canvas.width / 2 - 50 && mouseX <= canvas.width / 2 + 120) {
      if (mouseY >= 370 && mouseY <= 420) {
        restartGame();
      } else if (mouseY >= 220 && mouseY <= 275) {
        menu.style.display = 'flex';
        canvas.style.display = 'none';
        restartGame();
      }
    }  
  }
};

let isTouching = false;

export const handleTouch = event => {
  event.preventDefault();
  let touchX;

  if (event.touches && event.touches.length > 0) {
    touchX = event.touches[0].clientX; 
  } else if (event.changedTouches && event.changedTouches.length > 0) {
    touchX = event.changedTouches[0].clientX;
  } else {
    touchX = event.clientX;
  }

  const platformX = touchX - canvas.offsetLeft - platform.width / 2;

  if (platformX > 0 && platformX < canvas.width - platform.width) {
    platform.x = platformX;
  }

  if (event.type === 'touchstart') {
    isTouching = true; // Начало касания
  } else if (event.type === 'touchend') {
    isTouching = false; // Окончание касания
  }

  if (event.type === 'touchstart' && !platform.isBall) {
    platform.isBall = true; 
    ball.dx = 1; 
    ball.dy = -3;
  }
};
