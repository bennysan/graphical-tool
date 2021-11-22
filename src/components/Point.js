export default function Point(x, y, ctx, color, radius) {
  this.x = x;
  this.y = y;

  this.radius = radius || 5;
  this.color = color;

  this.show = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.fillText(
      "x : " + Math.floor(this.x) + " y: " + Math.floor(this.y),
      this.x + 10,
      this.y + -10
    );
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  this.set = (x, y) => {
    this.x = x;
    this.y = y;
  };
}
