import { getRandomNumber, getDistance } from "../util.js";
export class Particle {
    constructor(stageWidth, stageHeight) {
        this.isActive = false;
        this.radius = 4;
        this.diameter = this.radius * 2;
        this.x = Math.random() * (stageWidth - this.diameter) + this.radius;
        this.y = Math.random() * (stageHeight - this.diameter) + this.radius;
        this.velocity = {
            x: getRandomNumber(.5, 1, true),
            y: getRandomNumber(.5, 1, true)
        };
        this.color = '#000000';
    }
    windowBounce(stageWidth, stageHeight) {
        const minX = this.x - this.radius;
        const maxX = this.x + this.radius;
        const minY = this.y - this.radius;
        const maxY = this.y + this.radius;
        if (minX < 0 || maxX > stageWidth) {
            this.velocity.x *= -1;
            this.x += this.velocity.x;
        }
        else if (minY < 0 || maxY > stageHeight) {
            this.velocity.y *= -1;
            this.y += this.velocity.y;
        }
    }
    activeCheck(mousePos) {
        const dis = getDistance(this.x, this.y, mousePos.x, mousePos.y);
        this.isActive = dis < 100;
    }
    update(stageWidth, stageHeight, mousePos, theme) {
        this.windowBounce(stageWidth, stageHeight);
        this.activeCheck(mousePos);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (theme === 'light')
            this.color = '#000000';
        else if (theme === 'dark')
            this.color = '#FFFFFF';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
