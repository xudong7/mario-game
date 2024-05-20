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