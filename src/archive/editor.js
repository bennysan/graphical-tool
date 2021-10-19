import { Entitie } from "./entitie.js";
import { lerp, Vec2 } from "../utils/helpers.js";

export default function Editor(width, height) {
  this.canvas;
  this.ctx;
  this.width = width;
  this.height = height;
  this.mousePos = new Vec2(0, 0);
  this.artboards = [new Artboard()];

  this.init = function () {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.addEventListener("mousemove", this.handleMousePos);
    // this.canvas.addEventListener("click", this.handleClick);
  };

  this.handleMousePos = (e) => {
    this.mousePos.set(e.clentX, e.clientY);
    // console.log(e.clientX - this.artboards[0].x - this.canvas.width / 2);
    // console.log(e.clientY - this.artboards[0].y - this.canvas.height / 2);

    // console.log(this.artboards[0].position.sub(this.mousePos));
  };

  this.lastMousePos = new Vec2(0, 0);

  this.update = () => {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    this.ctx.fillStyle = "#ff000";
    this.ctx.arc(0, 0, 32, 0, Math.PI * 2);
    this.ctx.closePath();

    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.artboards[0].create(this.ctx, new Vec2(1280, 720), "Test_artboard");
    this.ctx.restore();
    this.lastMousePos.set(this.mousePos.x, this.mousePos.y);

    requestAnimationFrame(this.update);
  };

  //   this.handleClick = function (e) {

  //   };
}

function Artboard() {
  this.id;
  this.entitie;
  this.x;
  this.y;
  this.scale = 0.5;
  this.shapes = [];

  this.create = (ctx, size, id) => {
    this.id = id;
    this.entitie = new Entitie(ctx, size.mult(this.scale));
    this.x = this.entitie.position.x - this.entitie.size.x / 2;
    this.y = this.entitie.position.y - this.entitie.size.y / 2;
    this.entitie.show();
  };
}
