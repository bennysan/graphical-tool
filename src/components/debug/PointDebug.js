export function PointDebug(vertices) {
  // Array of vertices
  // For each vertex draw an arc and the point id
  this.vertices = vertices;

  this.show = (ctx) => {
    ctx.fillStyle = "lightgreen";
    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    this.vertices.forEach((vertex, i) => {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 4, 0, Math.PI * 2);
      ctx.fillText(
        "p" + i + "x: " + Math.floor(vertex.x) + "y: " + Math.floor(vertex.y),
        vertex.x + 10,
        vertex.y + 10
      );
      ctx.fill();
    });
  };
}
