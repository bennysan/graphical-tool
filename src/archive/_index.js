import DrawingBoard from "../components/_DrawingBoard.js";
import { Polygon } from "../components/polygon.js";
import Rect from "../components/Rect.js";
import { Vec2 } from "../utils/helpers.js";
const drawingBoard = new DrawingBoard();
drawingBoard.awake();
const ctx = drawingBoard.ctx;

let rect = new Rect(ctx);
let rect2 = new Rect(ctx);
let poly = new Polygon(ctx);

drawingBoard.addShape(rect);
drawingBoard.addShape(rect2);
drawingBoard.addShape(poly);

rect.position.x = (Math.random() * drawingBoard.canvas.width) / 2;
rect.position.y = (Math.random() * drawingBoard.canvas.height) / 2;

rect2.position.x = (Math.random() * drawingBoard.canvas.width) / 2;
rect2.position.y = (Math.random() * drawingBoard.canvas.height) / 2;
