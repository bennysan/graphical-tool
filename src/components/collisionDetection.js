import { Vec2 } from "../utils/helpers.js";

export function getShapeNormals(vertices) {
  let axes = [];

  for (let i = 0; i < vertices.length; i++) {
    let p1 = vertices[i],
      p2 = vertices[i + 1 == vertices.length ? 0 : i + 1],
      edge = { x: p1.x - p2.x, y: p1.y - p2.y },
      normal = { x: edge.y, y: -edge.x };

    axes.push(normal);
  }

  return axes;
}
