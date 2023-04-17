let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('foodeat.mp3');
const gameoversound = new Audio('gameover.mp3');
const backgroundsound = new Audio('backgroundsound.mp3');
const movesound = new Audio('move.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
  { x: 13, y: 15 }
];
let food = { x: 7, y: 9 };

//game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {
  //if snake head touches snake body
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if snake bump to wall
  if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
    return true;
  }


}

function gameEngine() {

  //part1:updating body of snake as a form of array

  if (isCollide(snakearr)) {
    gameoversound.play();
    backgroundsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("game over.press enetr to play again");
    score=0;
    snakearr = [{ x: 13, y: 15 }];
    
  }
  //if snake have eaten the food then waht to do
  //1st increament the score 
  //2nd regenrate the food

  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if(score>hiscoreval){
      hiscoreval=score;
      localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
      highscores.innerHTML="highscore : " +hiscoreval;
    }
    scores.innerHTML="score: "+score;
    snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }
  //now we have to move the snake
  // Moving the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food')
  board.appendChild(foodElement);
}









let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
  hiscoreval=0;
  localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
  hiscoreval=JSON.parse(hiscore);
  highscores.innerHTML="highscore : " +hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  backgroundsound.play();
  backgroundsound.volume = 0.5;
  backgroundsound.loop = true;
  inputDir = { x: 0, y: 1 };//start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    default:
      inputDir.x=0;
      inputDir.y=0;
      break;
  }
});
