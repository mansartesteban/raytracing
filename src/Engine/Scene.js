import Color from "./Color";

class Scene {
  constructor(camera, background, objects, lights) {
    this.camera = camera;
    this.background = background ?? Color.Black;
    this.objects = objects ?? [];
    this.lights = lights ?? [];
  }

  trace(x, y) {
    return this.camera.trace(this, x, y);
  }

}

export default Scene;