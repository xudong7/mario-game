/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 250;
CANVAS_HEIGHT = canvas.height = 182;

const red_src = '../assets/red_man.png';
const green_src = '../assets/green_man.png';
const walk_src = '../assets/stay.jpg';
const run_src = '../assets/walk.jpg';
const coin_src = '../assets/coin.png';
const monster_src = '../assets/monster2.png';
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



