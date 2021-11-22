import { dot, getRandomRange, normalizeVec2 } from "../utils/helpers.js";
import Point from "./Point.js";

export default function Rect(x, y, width, height) {
  this.sides = 3;
  this.vertices = [];
  this.x = x;
  this.y = y;
  this.rotation = 0;

  this.origin = { x: 0, y: 0 };

  this.width = width;
  this.height = height;

  this.isHovered = false;

  this.areVerticesVisible = true;

  this.make = () => {
    let vertices = [];
    for (let i = 0; i < this.sides; i++) {
      // Get the spacing for each verteces by deviding
      // by the side count
      const fraction = (Math.PI * 2) / this.sides;

      // Set a rotation offset if we want to draw a square
      // else just default it to zero
      const rotationOffset = this.sides === 4 ? Math.PI * 0.25 : 0;

      // Set the shape rotation equal to a fraction 2PI/360
      const rotation = ((Math.PI * 2) / 360) * this.rotation;

      // Creating vertices relative to the shape (x,y) and they index using the previusly
      // calculated value for rotation and the provided width and height
      vertices[i] = {
        x:
          this.x +
          (Math.sin(fraction * i + rotationOffset + rotation) * this.width) / 2,
        y:
          this.y +
          (Math.cos(fraction * i + rotationOffset + rotation) * this.height) /
            2,
      };
    }
    this.vertices = vertices;
  };

  this.show = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = "#222";
    ctx.fillStyle = this.isHovered ? "#ff0000" : "#222";
    ctx.lineWidth = 3;
    for (let i = 0; i <= this.sides; i++) {
      if (i === this.sides) {
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      } else {
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
    }
    ctx.stroke();
    if (this.isHovered) {
      ctx.fill();
    }
    ctx.closePath();

    if (this.areVerticesVisible) {
      // let vertices = [];
      // this.vertices.forEach((vertex, i) => {
      //   vertices[i] = new Point(vertex.x, vertex.y, ctx, "#ff0000").show();
      // });

      this.getShapeNormals().forEach((point) => {
        const norm = normalizeVec2(point);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#22222222";
        ctx.moveTo(norm.x * -1000, norm.y * -1000);
        ctx.lineTo(norm.x * 1000, norm.y * 1000);
        ctx.stroke();
        ctx.closePath();
      });
      // let normals = [];

      // this.getShapeNormals().forEach((point, i) => {
      //   normals[i] = new Point(
      //     this.x + point.x,
      //     this.y + point.y,
      //     ctx,
      //     "#f9aa00"
      //   ).show();
      // });

      const origin = new Point(this.x, this.y, ctx, "#00ff00");
      origin.show();
    }
  };

  this.update = (ctx) => {
    // this.rotate(getRandomRange(0.1, 1));
    this.make();
    this.show(ctx);
  };

  this.rotate = (value) => {
    this.rotation += value;
  };

  this.getShapeNormals = () => {
    let axes = [];

    for (let i = 0; i < this.vertices.length; i++) {
      let p1 = this.vertices[i],
        p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1],
        edge = { x: p1.x - p2.x, y: p1.y - p2.y },
        normal = { x: edge.y, y: -edge.x };

      axes.push(normal);
    }

    return axes;
  };

  this.projectShape = (vertices) => {
    let dots = [],
      index = 0,
      normal = [];

    const axes = this.getShapeNormals();
    for (var i = 0; i < vertices.length; i++) {
      for (var j = 0; j < axes.length; j++) {
        const axisNormalized = normalizeVec2(axes[j]);
        const _dot = dot(axisNormalized, vertices[i]);
        axisNormalized.x * vertices[i].x + axisNormalized.y + vertices[i].y;
        // console.log("index: " + i + " value: " + dot);
        dots[index] = _dot;
        normal[j] = axisNormalized;
        index++;
      }
    }
    return { dots, normal };
  };

  this.projectPoint = (point) => {
    const axes = this.getShapeNormals();

    let min = dot(axes[0], point),
      max = min,
      mouseDots = [];

    for (var i = 0; i < axes.length; i++) {
      const axisNormalized = normalizeVec2(axes[i]);

      const _dot = dot(axisNormalized, point);
      mouseDots[i] = _dot;
    }

    for (var i = 0; i < this.vertices.length; i++) {
      const _dot = dot(normalizeVec2(axes[i]), this.vertices[i]);
      if (_dot > max) {
        max = _dot;
      }
      if (_dot < min) {
        min = _dot;
      }
    }

    for (var i = 0; i < mouseDots.length; i++) {
      console.log(mouseDots[i] + " min: " + min + " max: " + max);
    }
    // console.log(this.isHovered);
    return { min, max, mouseDots };
  };

  this.setPos = (x, y) => {
    this.x = x;
    this.y = y;
    this.make();
  };

  this.showVertices = (bool) => {
    this.areVerticesVisible = bool;
  };
}
