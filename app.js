const gameBoard = document.querySelector('#board');
const context = gameBoard.getContext('2d');
const WIDTH = gameBoard.width, HEIGHT = gameBoard.height, UNIT = 25;
let foodX, foodY, xVel = 25, yVel = 0, snake = [{x:UNIT*3, y:0}, {x:UNIT*2, y:0}, {x:UNIT, y:0}, {x:0, y:0}];

startGame();

function startGame(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
    // drawSnake();
    // moveSnake();
    // clearBoard();
    nextTick();
    // drawSnake();
}

function nextTick(){
    setTimeout(()=>{
        clearBoard();
        moveSnake();
        drawSnake();
        nextTick();
    }, 100)
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/25)*25;
    foodY = Math.floor(Math.random()*HEIGHT/25)*25;
}
function clearBoard(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}
function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake(){
    context.fillStyle = '#09b909';
    context.strokeStyle = 'black';
    snake.forEach(part=>{
        context.fillRect(part.x, part.y, UNIT, UNIT);
        context.strokeRect(part.x, part.y, UNIT, UNIT);
    })
}

function moveSnake(){
    const head = {x: snake[0].x+xVel, y: snake[0].y+yVel};
    snake.unshift(head);
    snake.pop();
}