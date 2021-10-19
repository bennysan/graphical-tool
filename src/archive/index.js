import Editor from "./components/editor.js";
import { Entitie } from "./components/entitie.js";
import { Vec2 } from "./utils/helpers.js";

// let editor;

// window.onload = () => {
//   editor = new Editor(window.innerWidth, window.innerHeight);
//   editor.init();

//   editor.update();
// };

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const entitie = new Entitie();
const

for (let i = 0; i < Math.PI * 2; i += 1) {
  entitie.vertices.push(new Vec2(Math.sin(i), Math.cos(i)).mult(50));
}

for (let i = 0; i < entitie.vertices.length; i++) {
  ctx.beginPath();
  ctx.fillStyle = "#ff0000";
  ctx.arc(
    canvas.width / 2 + entitie.vertices[i].x,
    canvas.height / 2 + entitie.vertices[i].y,
    3,
    0,
    Math.PI * 2
  );

  ctx.fill();
  ctx.closePath();
}

console.log(entitie.vertices);
