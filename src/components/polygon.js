import { Vec2, lerp } from "../utils/helpers.js";

export function Polygon(_ctx, _sideCount, _size, _color) {
  this.sideCount = _sideCount;
  this.ctx = _ctx;
  this.size = _size;
  this.color = _color || "lightblue";

  this.position = new Vec2(0, 0);
  this.rotation = 0;
  this.scale = 1;
  this.vertices = [];

  this.isHovered = false;

  this.build = () => {
    this.vertices = [];
    for (var i = 0; i < this.sideCount; i++) {
      this.vertices.push(
        new Vec2(
          (Math.sin(((Math.PI * 2) / this.sideCount) * i) * this.size) / 2,
          (Math.cos(((Math.PI * 2) / this.sideCount) * i) * this.size) / 2
        )
      );
    }
  };

  this.updateSide = (value) => {
    if (this.sideCount !== value) {
      this.sideCount = value;
      this.build();
    }
  };

  this.rotate = (value) => {
    this.rotation = Math.PI * value;
    let delta = 0;

    const interval = lerp(this.rotation, value, delta);
    console.log(this.rotation);
  };

  this.updateSize = (value) => {
    if (this.size !== value) {
      this.size = value;
      this.build();
    }
  };

  this.checkForHover = (mousePos) => {
    if (
      mousePos.x - window.innerWidth / 2 > this.position.x - this.size / 2 &&
      mousePos.x - window.innerWidth / 2 < this.position.x + this.size / 2 &&
      mousePos.y - window.innerHeight / 2 > this.position.y - this.size / 2 &&
      mousePos.y - window.innerHeight / 2 < this.position.y + this.size / 2
    ) {
      this.isHovered = true;
    } else {
      this.isHovered = false;
    }
  };

  this.show = () => {
    this.ctx.save();
    this.ctx.rotate(this.rotation);
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = this.isHovered ? "coral" : this.color;

    for (var i = 0; i < this.sideCount; i++) {
      if (this.vertices[i] === undefined) {
        this.ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      } else {
        this.ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
    }
    this.ctx.closePath();

    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  };
}
