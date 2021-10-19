import Rect from "./Rect.js";

export default function DrawingBoard() {
  this.canvas;
  this.ctx;
  this.looping = true;
  this.delta = 0;

  this.shapes = [];

  this.awake = () => {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.initCanvasSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", () => {
      this.initCanvasSize(window.innerWidth, window.innerHeight);
      this.init();
    });

    this.init();
  };

  this.init = () => {
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    this.shapes.push(new Rect(this.ctx));
    this.shapes[0].stroke = true;
    this.shapes[0].showVertices(true);

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

    this.shapes[0].rotate(this.delta);

    this.shapes[0].update();
    this.delta += 0.001;
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

  this.initCanvasSize = (width, height) => {
    this.canvas.width = width;
    this.canvas.height = height;
  };
}
