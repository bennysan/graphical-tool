import { dot, normalizeVec2, project } from "../utils/helpers.js";
import Point from "./Point.js";

export default function DrawingBoard() {
  this.canvas = null;
  this.ctx = null;

  this.width = 800;
  this.height = 400;

  this.shapes = [];

  this.cursor = null;
  this.mouseInfo = { mouseX: 0, mouseY: 0 };

  this.init = (width, height) => {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    window.addEventListener("mousemove", (e) => {
      this.mouseInfo.mouseX = e.clientX - this.width / 2;
      this.mouseInfo.mouseY = e.clientY - this.height / 2;
    });

    this.cursor = new Point(
      this.mouseInfo.mouseX,
      this.mouseInfo.mouseY,
      this.ctx,
      "#0000ff"
    );

    if (width) {
      this.width = width;
    }
    if (height) {
      this.height = height;
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx.translate(this.width / 2, this.height / 2);
  };

  this.update = () => {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    const proj1 = this.shapes[0].projectPoint({
      x: this.mouseInfo.mouseX,
      y: this.mouseInfo.mouseY,
    });

    // proj1.mouseDots.foreach((dot) => {
    //   console.log(dot);
    // });

    proj1.mouseDots.forEach((value, i) => {
      let axes = normalizeVec2(this.shapes[0].getShapeNormals()[i]);
      new Point(axes.x * value, axes.y * value, this.ctx, "lime", 3).show();
      this.shapes[0].vertices.forEach((vertex) => {
        let thisdot = dot(axes, vertex);
        new Point(
          axes.x * thisdot,
          axes.y * thisdot,
          this.ctx,
          "red",
          3
        ).show();
      });
    });

    this.cursor.set(this.mouseInfo.mouseX, this.mouseInfo.mouseY);
    this.cursor.show(this.ctx);

    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].update(this.ctx);
    }
  };

  // Add a shape to the Shapes array
  this.addShape = (shape) => {
    this.shapes.push(shape);
    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].make(this.ctx);
    }
  };

  // Return all the shapes from the shapes array
  this.getShapes = () => {
    return this.shapes;
  };

  this.getMouseInfo = () => {
    return this.mouseInfo;
  };
}
