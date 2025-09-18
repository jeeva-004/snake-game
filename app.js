const gameBoard = document.querySelector('#board'), context = gameBoard.getContext('2d');
let scoreValue =  document.querySelector('span');
const WIDTH = gameBoard.width, HEIGHT = gameBoard.height, UNIT = 25;
let foodX, foodY, xVel = 25, yVel = 0, 
snake = [
    {x:UNIT*3, y:0}, {x:UNIT*2, y:0}, {x:UNIT, y:0}, {x:0, y:0}
], active = true, isStart = false;

window.addEventListener('keydown', keypress);

startGame();

function startGame(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
    drawSnake();
}

function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    }, 200)
}
else{
    clearBoard();
    context.font = 'bold 30px serif';
    context.fillStyle = 'White';
    context.textAlign = 'center';
    context.fillText(`Game Over! \n Press enter to start.`, WIDTH/2, HEIGHT/2);
}
}

function checkGameOver(){
    switch(true){
        case snake[0].x<0:
        case snake[0].x>=WIDTH:
        case snake[0].y<0:
        case snake[0].y>=HEIGHT:
            active = false;
            break;
    }
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

let score = 0;

function moveSnake(){
    const head = {x: snake[0].x+xVel, y: snake[0].y+yVel};
    snake.unshift(head);
    if(snake[0].x==foodX&&snake[0].y==foodY){
        score +=1;
        scoreValue.innerHTML = score;
        createFood();
    }
    else
        snake.pop();
}

function keypress(e){
    if(!isStart){
        isStart= true;
        nextTick();
    }
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    switch(true){
        case (e.keyCode==LEFT && xVel!=UNIT):
            xVel = -UNIT;
            yVel =  0;
            break;
        case (e.keyCode==UP && yVel!=UNIT):
            yVel = -UNIT;
            xVel = 0;
            break;
        case (e.keyCode==RIGHT && xVel!=-UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case (e.keyCode==DOWN && yVel!=-UNIT):
            yVel = UNIT;
            xVel = 0;
    }
}