import { Vec2 } from "../utils/helpers.js";

export default function Box(position) {
  this.position = position;
  this.scale = 1;
  this.verticies = [];
  this.faces = [];

  this.init = () => {
    this.verticies[0] = new Vec2(
      this.position.x - 100 * this.scale,
      this.position.y + 100 * this.scale
    );
    this.verticies[1] = new Vec2(
      this.position.x + 100 * this.scale,
      this.position.y + 100 * this.scale
    );
    this.verticies[2] = new Vec2(
      this.position.x + 100 * this.scale,
      this.position.y - 100 * this.scale
    );
    this.verticies[3] = new Vec2(
      this.position.x - 100 * this.scale,
      this.position.y - 100 * this.scale
    );

    this.faces[0] = [this.verticies[0], this.verticies[1]];
    this.faces[1] = [this.verticies[1], this.verticies[2]];
    this.faces[2] = [this.verticies[2], this.verticies[3]];
    this.faces[3] = [this.verticies[3], this.verticies[0]];
  };
}
