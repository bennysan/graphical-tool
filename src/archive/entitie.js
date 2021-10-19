import { Vec2 } from "../utils/helpers.js";

export function Entitie(pos) {
  this.position = pos || new Vec2(0, 0);
  this.scale = new Vec2(1, 1);
  this.rotation = 0;
  this.vertices = [];

  this.hover = false;
}
