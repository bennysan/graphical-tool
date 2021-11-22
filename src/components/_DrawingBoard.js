import { Vec2 } from "../utils/helpers.js";
import { getShapeNormals } from "./collisionDetection.js";
import { PointDebug } from "./debug/PointDebug.js";
import { Polygon } from "./polygon.js";
import Rect from "./Rect.js";

export default function _DrawingBoard() {
  this.canvas;
  this.ctx;
  this.looping = true;
  this.delta = 0;
  this.mouseInfos = {
    position: {
      x: 0,
      y: 0,
    },
  };

  this.shapes = [];

  this.initCanvasSize = (width, height) => {
    this.canvas.width = width;
    this.canvas.height = height;
  };

  this.awake = () => {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.initCanvasSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", () => {
      this.initCanvasSize(window.innerWidth, window.innerHeight);
      this.init();
    });

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouseInfos.position = {
        x: e.clientX - this.canvas.width / 2,
        y: e.clientY - this.canvas.height / 2,
      };
    });

    this.init();
  };

  this.init = () => {
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.loop();
  };

  this.update = () => {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(
      -this.canvas.width / 2,
      -this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );

    if (this.shapes.length > 0) {
      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].stroke = true;

        this.shapes[i].update();
      }
    }
  };

  this.loop = () => {
    this.update();
    if (this.looping) {
      requestAnimationFrame(this.loop);
    }
  };

  this.noLoop = () => {
    this.looping = false;
  };

  this.addShape = (shape) => {
    this.shapes.push(shape);
  };
}
