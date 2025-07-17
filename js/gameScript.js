// Game Constants
const oldBoard = document.getElementById("old-board");
const newBoard = document.getElementById("new-board");
const oldScoreDisplay = document.getElementById("old-score");
const newScoreDisplay = document.getElementById("new-score");
const highScoreDisplay = document.querySelectorAll(".high-score");
const navigationButtons = document.querySelectorAll(".navigation-buttons .btn");

const speedInputs = document.querySelectorAll(".speed-input");
const customSpeed = document.getElementById("custom-speed");

const a = 1;
let b = window.innerWidth <= 1000 ? 14 : 20;

const speeds = {
  verySlow: 4,
  slow: 6,
  medium: 8,
  fast: 12,
  veryFast: 20,
  godMode: 60,
};

let fps = speeds.medium;
let lastPrintTime = 0;

let score = 0;
let highscore = localStorage.getItem("Highscore") || 0;
setHighScoreInLocalStorage(0);

let food = {
  x: Math.floor(a + (b - a) * Math.random()),
  y: Math.floor(a + (b - a) * Math.random()),
};
let snakeArr = [{ x: b / 2 + 1, y: b / 2 }];
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
    snakeArr[0].x >= b ||
    snakeArr[0].y >= b
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
    snakeArr = [{ x: b / 2 + 1, y: b / 2 }];
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
  oldScoreDisplay.innerHTML = score;
  newScoreDisplay.innerHTML = score;
  Array.from(highScoreDisplay).forEach((display) => {
    display.innerHTML = highscore;
  });

  // Changing the speed of the snake
  Array.from(speedInputs).forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText === "Very Slow") fps = speeds.verySlow;
      else if (element.innerText === "Slow") fps = speeds.slow;
      else if (element.innerText === "Medium") fps = speeds.medium;
      else if (element.innerText === "Fast") fps = speeds.fast;
      else if (element.innerText === "Very Fast") fps = speeds.veryFast;
      else if (element.innerText === "God Mode") fps = speeds.godMode;
      // Change the text in the main toggle button
      dropdownToggleButton.innerHTML = `${element.innerText} <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>`;
      // Hide the dropdown after selecting the speed
      dropdownList.classList.add("hidden");
      dropdownUnderlay.classList.toggle("hidden");
      dropdownToggleButton.classList.remove("selected");
    });
  });

  customSpeed.addEventListener("change", () => {
    fps = customSpeed.value;
    // Change the text in the main toggle button
    dropdownToggleButton.innerHTML = `Custom ${fps} <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>`;
  });

  // Moving the snake
  for (let index = snakeArr.length - 2; index >= 0; index--) {
    snakeArr[index + 1] = { ...snakeArr[index] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  // Rendering the snake
  newBoard.innerHTML = "";
  oldBoard.innerHTML = "";
  let count = 1;
  snakeArr.forEach((element, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.classList.add("snake-body");
    if (count == 1) snakeElement.classList.add("snake-head");
    count++;
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.style.gridRowStart = element.y;
    oldUI.classList.contains("hidden")
      ? newBoard.appendChild(snakeElement)
      : oldBoard.appendChild(snakeElement);
  });

  // Rendering the food
  let foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  oldUI.classList.contains("hidden")
    ? newBoard.appendChild(foodElement)
    : oldBoard.appendChild(foodElement);
}

// Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (event) => {
  direction = { x: 0, y: 0 };
  switch (event.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      direction.x = direction.x;
      direction.y = direction.y;
      break;
  }
});

// Logic For Using in browser buttons to navigate the snake
Array.from(navigationButtons).forEach((button, directionNo) => {
  button.addEventListener("click", () => {
    direction = { x: 0, y: 0 };
    switch (directionNo) {
      case 0: // upwards
        direction.x = 0;
        direction.y = -1;
        break;
      case 1: // left side
        direction.x = -1;
        direction.y = 0;
        break;
      case 2: // right side
        direction.x = 1;
        direction.y = 0;
        break;
      case 3: // downwards
        direction.x = 0;
        direction.y = 1;
        break;

      default:
        break;
    }
  });
});
