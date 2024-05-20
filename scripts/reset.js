function resetGame() {
    man.x = CANVAS_WIDTH / 2;
    man.y = CANVAS_HEIGHT - 60; 
    monster.x = Math.random() * (CANVAS_WIDTH - monster.width);
    monster.y = Math.random() * (CANVAS_HEIGHT - monster.height);
    coin.x = Math.random() * (CANVAS_WIDTH - coin.width);
    coin.y = Math.random() * (CANVAS_HEIGHT - coin.height);

    score = 0;

    startGame();
}