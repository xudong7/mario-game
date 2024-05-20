/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 250;
CANVAS_HEIGHT = canvas.height = 182;

const red_src = 'red_man.png';
const green_src = 'green_man.png';
const walk_src = 'stay.jpg';
const run_src = 'walk.jpg';
const coin_src = 'coin.png';
const monster_src = 'monster2.png';

const red_width = 24;
const red_height = 23;
const green_width = 26;
const green_height = 28;
const walk_width = 484;
const walk_height = 726;
const run_width = 547;
const run_height = 865;
const coin_width = 10;
const coin_height = 10;
const monster_width = 211;
const monster_height = 238;

let score = 0;
ctx.font = '10px consolas';


class Man{
    constructor(){
        this.x = 24;
        this.y = 24;
        this.ratio = 1.5;
        this.width = red_width / this.ratio;
        this.height = red_height / this.ratio;
        this.image = new Image();
        this.image.src = red_src;
        this.speed = 2;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    changeImage(){
        if(this.image.src.includes(red_src)){
            this.image.src = green_src;
            this.width = green_width / this.ratio;
            this.height = green_height / this.ratio;
        }
        else{
            this.image.src = red_src;
            this.width = red_width / this.ratio;
            this.height = red_height / this.ratio;
        }
    }
    move(movement){
        requestAnimationFrame(this.move.bind(this));
        switch(movement){
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }
        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(CANVAS_HEIGHT - this.height, this.y));
    }
}

class Coin{
    constructor(){
        this.x = Math.random() * (CANVAS_WIDTH - 10);
        this.y = Math.random() * (CANVAS_HEIGHT - 10);
        this.width = coin_width;
        this.height = coin_height;
        this.image = new Image();
        this.image.src = coin_src;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Monster{
    constructor(){
        this.x = Math.random() * (CANVAS_WIDTH - 10);
        this.y = Math.random() * (CANVAS_HEIGHT - 10);
        this.ratio = 15;
        this.width = monster_width / this.ratio;
        this.height = monster_height / this.ratio;
        this.vx = 0; // 新增水平速度
        this.vy = 0; // 新增垂直速度
        this.image = new Image();
        this.image.src = monster_src;
        this.move();
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move(){
        requestAnimationFrame(this.move.bind(this));
        // 随机改变方向
        if (Math.random() < 0.05) { // 调整这个概率来控制方向改变的频率
            const directions = [
                {vx: 0, vy: -0.3}, // 上
                {vx: 0, vy: 0.3},  // 下
                {vx: -0.3, vy: 0}, // 左
                {vx: 0.3, vy: 0}   // 右
            ];
            const choice = directions[Math.floor(Math.random() * directions.length)];
            this.vx = choice.vx;
            this.vy = choice.vy;
        }
        // 更新位置
        this.x += this.vx;
        this.y += this.vy;
        // 确保不会移出画布
        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(CANVAS_HEIGHT - this.height, this.y));
    }
}

window.addEventListener('keydown', function(e){
    switch(e.key){
        case 'ArrowUp':
        case 'w':
            man.move('up');
            break;
        case 'ArrowDown':
        case 's':
            man.move('down');
            break;
        case 'ArrowLeft':
        case 'a':
            man.move('left');
            break;
        case 'ArrowRight':
        case 'd':
            man.move('right');
            break;
        case 'Enter':
            man.changeImage();
            break;
    }
});

window.addEventListener('keydown', function(e){
    if(e.key === 'Shift'){
        man.speed *= 5; 
    }
});

window.addEventListener('keyup', function(e){
    if(e.key === 'Shift'){
        man.speed /= 5; 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    playButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playButton.textContent = 'Pause Music'; 
        } else {
            backgroundMusic.pause();
            playButton.textContent = 'Play Music'; 
        }
    });
});

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 5, 10);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 6, 11);
}

function checkCollision(obj1, obj2) {
    let judge = obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + coin.height &&
    obj1.y + obj1.height > obj2.y;
    if(judge === true && obj2 instanceof Monster){
        let restart = confirm(`Game Over! Your score is ${score}. Do you want to restart the game?`);
        if (restart) {
            resetGame();
        }
    }
    else if(judge === true && obj2 instanceof Coin){
        return true;
    }
}

function resetGame() {
    man.x = CANVAS_WIDTH / 2;
    man.y = CANVAS_HEIGHT - 60; 
    monster.x = Math.random() * (CANVAS_WIDTH - monster.width);
    monster.y = Math.random() * (CANVAS_HEIGHT - monster.height);
    coin.x = Math.random() * (CANVAS_WIDTH - coin.width);
    coin.y = Math.random() * (CANVAS_HEIGHT - coin.height);

    score = 0;

    requestAnimationFrame(animate);
}

const man = new Man();
const monster = new Monster();
const coin = new Coin();

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    man.draw();
    monster.draw();
    coin.draw();
    checkCollision(man, monster);
    if (checkCollision(man, coin)) {
        score += 1; 
        coin.x = Math.random() * (CANVAS_WIDTH - 20);
        coin.y = Math.random() * (CANVAS_HEIGHT - 20);
    }
    drawScore();
    requestAnimationFrame(animate);
}
animate();



