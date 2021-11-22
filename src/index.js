import DrawingBoard from "./components/DrawingBoard.js";
import Point from "./components/Point.js";
import Rect from "./components/Rect.js";
import { getRandomRange } from "./utils/helpers.js";

const drawingBoard = new DrawingBoard();
drawingBoard.init(window.innerWidth, window.innerHeight);

for (var i = 0; i < 1; i++) {
  const x = 0,
    y = 0;
  drawingBoard.addShape(new Rect(x, y, 300, 300));
}

const loop = () => {
  drawingBoard.update();

  // requestAnimationFrame(loop);
};

loop();
