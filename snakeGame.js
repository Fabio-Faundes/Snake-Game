const width = 36;
const height = 36;
const snakeSize = 20;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var snake;
var bodyLength;
var direction = 0;

var food;

var gameOver;
var changingDirection;

class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    toString ()
    {
        var ret = "";
        ret += this.x + ", ";
        ret += this.y + ";";

        return ret;
    }
}                        

function startGame () {   
    window.addEventListener("keydown", function(e){
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
           e.preventDefault();
           }
    });
    
    document.addEventListener("keydown", function (e){                    
        var code = e.keyCode;
        switch (code)
        {
            case 38: if(direction != 2 && !changingDirection) direction = 3; changingDirection = true; break;
            case 37: if(direction != 0 && !changingDirection) direction = 1; changingDirection = true; break;
            case 40: if(direction != 3 && !changingDirection) direction = 2; changingDirection = true; break;   
            case 39: if(direction != 1 && !changingDirection) direction = 0; changingDirection = true; break;
        }  
    });

    direction = 0;

    const middleW = Math.floor(width/2);
    const middleH = Math.floor(height/2);
    gameOver = false;

    bodyLength = 10;
    snake = Array();

    for(var i = 0; i < bodyLength; i++)
        snake[i] = new Point(middleW - i, middleH);

    //alert(""+snake);

    generateFood();

    var id = setInterval(function ()
    {                            
        paintComponents(); 
        if (foodEaten())
        {                        
            increaseSize();    
            generateFood();
        }
        increasePosition();
        gameOver = checkCollision();
        if(gameOver)
            clearInterval(id);                    
        changingDirection = false;
    }, 100);

    restart();
}

function paintComponents() {
    paintBackGround();
    paintFood();
    paintSnake();
}

function paintSnake () {
    context.fillStyle = "white";
    context.strokeStyle = "black";

    for(var i = 0; i < bodyLength; i++)
    {
        var x = snake[i].x * snakeSize;
        var y = snake[i].y * snakeSize;                  

        //alert("Valores: " + x + " e "+ y + " e " + bodyLength + " e " + i);
        //alert(""+(x+snakeSize));

        context.fillRect(x ,y , snakeSize, snakeSize);
        context.strokeRect(x, y, snakeSize, snakeSize);
    }

}

function paintFood () {
    context.strokeStyle = "yellow";        
    context.strokeRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);

    //alert(food.x.toString() + food.y.toString());

    context.fillStyle = "red";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function paintBackGround () {
    context.strokeStyle = "black";
    context.fillStyle = "rgb(255,255,255)";

    context.fillRect(20,20,700,700);
    context.strokeRect(20,20,700,700);
}

function increaseSize () {
    snake[bodyLength] = new Point(snake[bodyLength-1].x, snake[bodyLength-1].y);
    snake[bodyLength+1] = new Point(snake[bodyLength-1].x, snake[bodyLength-1].y);

    bodyLength += 2;
}

function increasePosition()
{
    for(var i = bodyLength-1; i > 0; i--)
        {
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }

    switch (direction)
        {
            case 0: snake[0].x++; break; //direita;
            case 1: snake[0].x--; break; //esquerda;
            case 2: snake[0].y++; break; //baixo;
            case 3: snake[0].y--; break; //cima;
        }

}

function checkCollision () {                
    if(snake[0].x > 35 || snake[0].x < 1 || snake[0].y > 35 || snake[0].y < 1)
        return true;

    for(var i = 1; i < bodyLength; i++)
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            return true;

    return false;                    
}

function generateFood () {                
    food = new Point(Math.floor(Math.random()*34) , Math.floor(Math.random()*34));

    if(food.x > 35 || food.x < 1 || food.y > 35 || food.y < 1)
        generateFood();

    for(var i = 0; i < bodyLength; i++)
        if(food.x == snake[i].x && food.y == snake[i].y)
        {
            generateFood();
            break;
        }                
}

function foodEaten () {
    if(snake[0].x == food.x && snake[0].y == food.y)
        return true;

    return false;
}

function restart () {
    
}