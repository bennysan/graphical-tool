export function PointDebug(vertices) {
  // Array of vertices
  // For each vertex draw an arc and the point id
  this.vertices = vertices;

  this.show = (ctx) => {
    ctx.fillStyle = "lightgreen";
    ctx.font = "16px Arial";

    this.vertices.forEach((vertex, i) => {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
      ctx.fillText("p" + i, vertex.x + 10, vertex.y + 20);
      ctx.fill();
    });
  };
}
