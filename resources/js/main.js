let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = {
  x: 8*box,
  y: 8*box,
}

let direction = 'right';

function criarBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
  for(let i = 0; i < snake.length; i++) {
    if(i!== 0) context.fillStyle = 'green';
    else context.fillStyle = 'blue';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function iniciarJogo() {

  for(let i = 1; i < snake.length; i++) {
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(jogo);
      alert("Game Over :(");
    }
  }

  criarBG();
  criarCobra();  
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction === 'right') {
    snakeX += box;
    if(snakeX > 15*box) snakeX = 0;
  }
  else if(direction === 'left') {
    snakeX -= box;
    if(snakeX < 0) snakeX = 15*box;
  }
  else if(direction === 'up') {
    snakeY -= box;
    if(snakeY < 0) snakeY = 15*box;
  }
  else if(direction === 'down') {
    snakeY += box;
    if(snakeY > 15*box) snakeY = 0;
  }

  if(snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box
    }
  } else snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  snake.unshift(newHead);
}

function update(e) {
  if(e.keyCode === 37 && direction !== 'right') direction = 'left';
  else if(e.keyCode === 38 && direction !== 'down') direction = 'up';
  else if(e.keyCode === 39 && direction !== 'left') direction = 'right';
  else if(e.keyCode === 40 && direction !== 'up') direction = 'down';
}

let jogo = setInterval(iniciarJogo, 100);

document.addEventListener('keydown', update);