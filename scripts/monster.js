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