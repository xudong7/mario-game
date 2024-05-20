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