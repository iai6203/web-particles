import { MousePos, Velocity } from "../interfaces/global.js";
import { getRandomNumber, getDistance } from "../util.js";

export class Particle {
  isActive: boolean;
  private readonly radius: number;
  private readonly diameter: number;

  x: number;
  y: number;

  private color: string;

  private readonly velocity: Velocity;

  constructor(stageWidth: number, stageHeight: number) {
    this.isActive = false;
    this.radius = 4;
    this.diameter = this.radius * 2;

    this.x = Math.random() * (stageWidth - this.diameter) + this.radius;
    this.y = Math.random() * (stageHeight - this.diameter) + this.radius;

    this.velocity = {
      x: getRandomNumber(.5, 1, true),
      y: getRandomNumber(.5, 1, true)
    }

    this.color = '#000000';
  }

  private windowBounce(stageWidth: number, stageHeight: number): void {
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

  private activeCheck(mousePos: MousePos): void {
    const dis = getDistance(this.x, this.y, mousePos.x, mousePos.y);

    this.isActive = dis < 100;
  }

  update(stageWidth: number, stageHeight: number, mousePos: MousePos, theme: string): void {
    this.windowBounce(stageWidth, stageHeight);
    this.activeCheck(mousePos);

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (theme === 'light') this.color = '#000000';
    else if (theme === 'dark') this.color = '#FFFFFF';
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();
  }
}