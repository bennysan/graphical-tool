const normals = getShapeNormals(this.shapes[0].vertices);
console.log(normals);

this.shapes[0].show(this.ctx);
this.shapes[0].showVertices(true);

this.ctx.beginPath();
this.ctx.lineWidth = 2;
this.ctx.strokeStyle = "red";

for (var i = 0; i < normals.length; i++) {
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(normals[i].x, normals[i].y);
}

this.ctx.stroke();
this.ctx.closePath();

const axisMag = Math.sqrt(
  normals[0].x * normals[0].x + normals[0].x * normals[0].x
);
const normalizedAxis = {
  x: normals[0].x / axisMag,
  y: normals[0].y / axisMag,
};
const dot =
  this.mouseInfos.x * normalizedAxis.x + this.mouseInfos.y * normalizedAxis.y;

const points = new PointDebug([
  ...normals,
  this.mouseInfos,
  { x: normalizedAxis.x * dot, y: normalizedAxis.x * dot },
]);
points.show(this.ctx);
