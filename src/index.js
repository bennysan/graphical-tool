import DrawingBoard from "./components/DrawingBoard.js";
import Rect from "./components/Rect.js";
import { Vector2d, vectorMath } from "./utils/vector2d.js";

const drawingBoard = new DrawingBoard();
drawingBoard.init(window.innerWidth, window.innerHeight);

for (var i = 0; i < 1; i++) {
  const x = 0,
    y = 0;
  drawingBoard.addShape(new Rect(x, y, 300, 300));
}

const v0 = new Vector2d(Math.sin(0.1), Math.cos(0.1));
const v2 = new Vector2d(Math.sin(0.3), Math.cos(0.3));

const v1 = vectorMath.dot(v0, v2);

const loop = () => {
  drawingBoard.update();

  // requestAnimationFrame(loop);
};

loop();
