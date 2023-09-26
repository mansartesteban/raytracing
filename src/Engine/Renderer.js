import { RENDERER_DETAILS } from "../settings";
import Vector2 from "./Vector2";

class Renderer {
  #canvasSize;

  constructor(canvasSize) {
    this.#canvasSize = canvasSize;
  }

  set canvasSize(canvasSize) {
    this.#canvasSize = canvasSize;
  }

  render(scene, callback) {

    let sX = 0;
    let sY = 0;
    let pixel = null;

    const steps = new Vector2(1 / RENDERER_DETAILS, 1 / RENDERER_DETAILS);

    for (let y = 0; y < this.#canvasSize.y / steps.y; y += steps.y) {
      for (let x = 0; x < this.#canvasSize.x / steps.x; x += steps.x) {
        sX = (x / this.#canvasSize.x) * steps.x - .5;
        sY = (y / this.#canvasSize.y) * steps.y - .5;
        pixel = scene.trace(sX, sY);
        callback(x * steps.x, y * steps.y, pixel);
      }
    }

  }
}

export default Renderer;