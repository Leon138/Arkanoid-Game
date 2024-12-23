import { bricksArr, checkLevelCompletion } from "./main.js";
import { gameState, ball, bricks } from "./game-object.js";
import { loadSound } from "./main.js";


export const collisionDetection = () => {
  for (let col = 0; col < bricksArr.length; col++) {
    for (let row = 0; row < bricksArr[col].length; row++) {
      const b = bricksArr[col][row];
      if (b.status > 0) { // Проверяем, если кирпич активен
        if (ball.x + ball.radius > b.x &&  
            ball.x - ball.radius < b.x + bricks.width &&
            ball.y + ball.radius > b.y && 
            ball.y - ball.radius < b.y + bricks.height) {
            loadSound('./assets/tap.wav');
             // Определяем сторону столкновения
            const distX = (ball.x - (b.x + bricks.width / 2));
            const distY = (ball.y - (b.y + bricks.height / 2));
             // Проверка, с какой стороны произошло столкновение
             if (Math.abs(distX) > Math.abs(distY)) {
              // Столкновение с вертикальной стороной
              ball.dx = -ball.dx; // Изменяем направление по X
            } else {
              // Столкновение с горизонтальной стороной
              ball.dy = -ball.dy; // Изменяем направление по Y
            }
          b.status--; // Уменьшаем статус повреждения
          if (b.status == 0) gameState.score++; // Увеличиваем счет
        }
      }
    }
  }
  if (!gameState.gameOver) {
    checkLevelCompletion();
  }
};