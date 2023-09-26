import Color from "./Color";
  
class Scene {
  constructor(camera, background, objects) {
    this.camera = camera;
    this.background = background ?? Color.Black;
    this.objects = objects ?? [];
  }

  trace(x, y) {
    return this.camera.trace(this, x, y);
  }

}

export default Scene;