// Game Constants
const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const gameOverModal = document.getElementById("gameOverModal");
const fps = 8;
let a = 1;
let b = 30;
let lastPrintTime = 0;

let score = 0;
let highscore = localStorage.getItem("Highscore") || 0;
setHighScoreInLocalStorage(0);

let food = {
  x: Math.floor(a + (b - a) * Math.random()),
  y: Math.floor(a + (b - a) * Math.random()),
};
let snakeArr = [{ x: 15, y: 15 }];
let direction = { x: 0, y: 0 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPrintTime) / 1000 < 1 / fps) return;
  lastPrintTime = ctime;
  gameEngine();
}

function setHighScoreInLocalStorage(highscore) {
  // Setting Highscore equal to 0 in localstorage
  if (highscore > 0) {
    localStorage.setItem("Highscore", JSON.stringify(highscore));
  }
}

// Using a recursive function to check whether the food has appeared on the body of the snake. If the conditions are matched, the recursion comes to action.
function renderFood() {
  food = {
    x: Math.floor(a + (b - a) * Math.random()),
    y: Math.floor(a + (b - a) * Math.random()),
  };

  for (let index = 0; index < snakeArr.length; index++) {
    if (food.x == snakeArr[index].x && food.y == snakeArr[index].y)
      renderFood();
  }
}

function gameOver(snakeArr) {
  for (let index = 1; index < snakeArr.length; index++) {
    // If the snake bumps into itself
    if (
      snakeArr[index].x == snakeArr[0].x &&
      snakeArr[index].y == snakeArr[0].y
    )
      return true;
  }

  // If the snake bumps into one of the four walls
  if (
    snakeArr[0].x <= 0 ||
    snakeArr[0].y <= 0 ||
    snakeArr[0].x >= 30 ||
    snakeArr[0].y >= 30
  )
    return true;

  return false;
}

// Game Engine
function gameEngine() {
  // Updating the Snake's Location
  if (gameOver(snakeArr)) {
    direction = { x: 0, y: 0 };
    alert(`GameOver! Press "Enter" to play again.`);
    snakeArr = [{ x: 15, y: 15 }];
    score = 0;
  }

  // When eaten the food, increment the score and re-render the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    renderFood();

    // Incrementing the score
    score++;
  }

  // Updating the score and the highscore
  if (score >= highscore) {
    highscore = score;
    setHighScoreInLocalStorage(highscore);
  }
  scoreDisplay.innerHTML = score;
  highScoreDisplay.innerHTML = highscore;

  // Moving the snake
  for (let index = snakeArr.length - 2; index >= 0; index--) {
    snakeArr[index + 1] = { ...snakeArr[index] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  // Rendering the snake
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.classList.add("snake-body");
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.style.gridRowStart = element.y;
    board.appendChild(snakeElement);
  });

  // Rendering the food
  let foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  board.appendChild(foodElement);
}

// Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (event) => {
  direction = { x: 1, y: 0 };

  switch (event.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      direction.x = 1;
      direction.y = 0;
      break;

    default:
      break;
  }
});
