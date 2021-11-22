import { Vec2 } from "../utils/helpers.js";
import { PointDebug } from "./debug/PointDebug.js";

export default function Rect(ctx) {
  this.vertices = [];
  this.size = new Vec2(50, 50);
  this.position = new Vec2(0, 0);
  this.rotation = 0;
  this.scale = new Vec2(1, 1);
  this.fill = false;
  this.stroke = true;
  this.showDebugVertices = true;

  this.build = () => {
    for (let i = 0; i < 4; i++) {
      const x = Math.sin(Math.PI * (0.25 + this.rotation + 0.5 * i));
      const y = Math.cos(Math.PI * (0.25 + this.rotation + 0.5 * i));

      this.vertices[i] = new Vec2(
        x * this.size.x * this.scale.x + this.position.x,
        y * this.size.y * this.scale.y + this.position.y
      );
    }
  };

  this.update = () => {
    this.build();
    this.show();
  };

  this.show = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#222";
    ctx.fillStyle = "#222";
    ctx.lineWidth = 3;
    for (let i = 0; i <= 4; i++) {
      if (i === 4) {
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      } else {
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
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
    this.build();
  };

  this.follow = (target) => {
    this.position.set(target.x, target.y);
    this.update();
  };

  this.showVertices = (show) => {
    this.showDebugVertices = show;
  };
}
