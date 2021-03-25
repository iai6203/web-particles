export class Line {
    constructor(sx, sy, tx, ty, alpha) {
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.alpha = alpha;
        this.color = `rgba(0, 0, 0, ${this.alpha})`;
    }
    update(theme) {
        if (theme === 'light')
            this.color = `rgba(0, 0, 0, ${this.alpha})`;
        else if (theme === 'dark')
            this.color = `rgba(255, 255, 255, ${this.alpha})`;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.sx, this.sy);
        ctx.lineTo(this.tx, this.ty);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}
