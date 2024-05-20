class Monster{
    constructor(){
        this.x = Math.random() * (CANVAS_WIDTH - 10);
        this.y = Math.random() * (CANVAS_HEIGHT - 10);
        this.ratio = 15;
        this.width = monster_width / this.ratio;
        this.height = monster_height / this.ratio;
        this.vx = 0; // ����ˮƽ�ٶ�
        this.vy = 0; // ������ֱ�ٶ�
        this.image = new Image();
        this.image.src = monster_src;
        this.move();
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move(){
        requestAnimationFrame(this.move.bind(this));
        // ����ı䷽��
        if (Math.random() < 0.05) { // ����������������Ʒ���ı��Ƶ��
            const directions = [
                {vx: 0, vy: -0.3}, // ��
                {vx: 0, vy: 0.3},  // ��
                {vx: -0.3, vy: 0}, // ��
                {vx: 0.3, vy: 0}   // ��
            ];
            const choice = directions[Math.floor(Math.random() * directions.length)];
            this.vx = choice.vx;
            this.vy = choice.vy;
        }
        // ����λ��
        this.x += this.vx;
        this.y += this.vy;
        // ȷ�������Ƴ�����
        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(CANVAS_HEIGHT - this.height, this.y));
    }
}