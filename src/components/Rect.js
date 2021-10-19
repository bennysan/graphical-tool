import { Vec2 } from "../utils/helpers.js";
import { PointDebug } from "./debug/PointDebug.js";

export default function Rect(ctx) {
  this.vertices = [];
  this.size = new Vec2(50, 50);
  this.position = new Vec2(0, 0);
  this.rotation = 0;
  this.scale = new Vec2(1, 1);
  this.fill = false;
  this.stroke = false;
  this.showDebugVertices = false;

  this.verticesCopy = [];

  this.init = () => {
    for (let i = 0; i < 4; i++) {
      const x = Math.sin(Math.PI * (0.25 + this.rotation + 0.5 * i));
      const y = Math.cos(Math.PI * (0.25 + this.rotation + 0.5 * i));

      this.vertices[i] = new Vec2(
        x * this.size.x * this.scale.x + this.position.x,
        y * this.size.y * this.scale.y + this.position.y
      );
    }

    this.verticesCopy = this.vertices;
  };

  this.update = () => {
    this.init();
    this.show();
  };

  this.show = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 0; i < 4; i++) {
      if (i === 3) {
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      } else {
        ctx.lineTo(this.vertices[i + 1].x, this.vertices[i + 1].y);
      }
    }
    this.fill && ctx.fill();
    this.stroke && ctx.stroke();

    ctx.closePath();

    if (this.showDebugVertices) {
      const pointDebug = new PointDebug(this.vertices);
      pointDebug.show(ctx);
    }
  };

  this.rotate = (value) => {
    this.rotation = value;
    this.init();
  };

  this.follow = (target) => {
    this.position.set(target.x, target.y);
    this.update();
  };

  this.showVertices = (show) => {
    this.showDebugVertices = show;
  };
}
