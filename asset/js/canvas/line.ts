export class Line {
  private readonly sx: number;
  private readonly sy: number;
  private readonly tx: number;
  private readonly ty: number;
  private readonly alpha: number;

  private color: string;

  constructor(sx: number, sy: number, tx: number, ty: number, alpha: number) {
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.alpha = alpha;

    this.color = `rgba(0, 0, 0, ${this.alpha})`;
  }

  update(theme: string): void {
    if (theme === 'light') this.color = `rgba(0, 0, 0, ${this.alpha})`;
    else if (theme === 'dark') this.color = `rgba(255, 255, 255, ${this.alpha})`;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.tx, this.ty);
    ctx.closePath();

    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

}