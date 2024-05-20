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