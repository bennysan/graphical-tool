import { Vec2, lerp } from "../utils/helpers.js";
import { PointDebug } from "./debug/PointDebug.js";

export function Polygon(ctx, sideCount, color) {
  this.vertices = [];
  this.size = new Vec2(100, 100);
  this.position = new Vec2(0, 0);
  this.rotation = Math.random();
  this.rotationSpeed = Math.random();
  this.scale = new Vec2(1, 1);

  this.gravity = 2;
  this.velocity = new Vec2(
    Math.random() * 0.2 * this.gravity,
    Math.random() * 0.2 * this.gravity
  );

  this.sideCount = sideCount;
  this.color = color || "#fff";
  this.fill = true;
  this.stroke = false;

  this.showDebugVertices = false;

  this.isHovered = false;

  this.build = () => {
    for (var i = 0; i < this.sideCount; i++) {
      const x = Math.sin(((Math.PI * 2) / this.sideCount) * i + this.rotation);
      const y = Math.cos(((Math.PI * 2) / this.sideCount) * i + this.rotation);
      this.vertices[i] = new Vec2(
        x * this.size.x * this.scale.x + this.position.x,
        y * this.size.y * this.scale.y + this.position.y
      );
    }
  };

  this.update = () => {
    // this.position.x += .01;
    if (this.position.y > window.innerHeight + this.size.y * this.scale.y) {
      this.position.x = Math.random() * window.innerWidth;
      this.position.y = 0 - this.size.y * this.scale.y;
      this.rotate(Math.random() * 2);
    }

    this.position.x += this.velocity.x / 2;
    this.position.y += this.velocity.y / 2;

    this.build();
    this.show();
  };

  this.show = () => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    for (var i = 0; i <= this.sideCount; i++) {
      if (i === this.sideCount) {
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      } else {
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
    }

    this.fill && ctx.fill();
    this.stroke && ctx.stroke();

    if (this.showDebugVertices) {
      const pointDebug = new PointDebug(this.vertices);
      pointDebug.show(ctx);
    }
  };

  this.updateSide = (value) => {
    if (this.sideCount !== value) {
      this.sideCount = value;
      this.build();
    }
  };

  this.rotate = (value) => {
    this.rotation = value * this.rotationSpeed;
    this.build();
  };

  this.updateColor = (value) => {
    this.color = value;
  };

  this.setScale = (value) => {
    this.scale.x = value;
    this.scale.y = value;
  };

  this.showVertices = (show) => {
    this.showDebugVertices = show;
  };
}
