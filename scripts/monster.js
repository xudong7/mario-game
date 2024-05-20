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
        this.frame = 0;
        this.maxFrame = 4;
        this.frameTimer = 0;
        this.frameInterval = 800;
        this.move();
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move(){
        requestAnimationFrame(this.move.bind(this));
        this.frameTimer += 8;

        if (this.x < 0 || this.x > CANVAS_WIDTH - this.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
            this.vy *= -1;
        }
        
        const directions = [
            {vx: 0.2, vy: -0.4}, 
            {vx: -0.2, vy: 0.4},  
            {vx: -0.4, vy: 0.2}, 
            {vx: 0.4, vy: -0.2}   
        ];
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0; 
            if (this.frame < this.maxFrame) {
                const choice = directions[Math.floor(Math.random() * directions.length)];
                this.vx = choice.vx;
                this.vy = choice.vy;
                this.frame++;
            }
            else {
                this.frame = 0;
                this.vx = 0;
                this.vy = 0;
            }
        }
        this.x += this.vx;
        this.y += this.vy;
    }
}