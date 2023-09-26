import { THRESHOLD } from "../settings";
import Color from "./Color";
import Vector3 from "./Vector3";

class Shape {

  constructor(material) {
    this.material = material;
  }

  intersect() {
    throw "Classes which extend Shape class must implements 'intersect' method";
  }

  getNormalAt() {
    throw "Classes which extend Shape class must implements 'getNormalAt' method";
  }


  closest(ray) {
    const intersections = this.intersect(ray).filter(d => d > THRESHOLD);
    return Math.min.apply(Math, intersections);
  }

  getColorAt(point, scene) {
    const normal = this.getNormalAt(point);
    let color = Color.Black;
    scene.lights.forEach(light => {
      const v = Vector3.from(point).to(light.position);
      const lightValue = normal.dot(v.normalize());
      if (lightValue <= 0) {
        return;
      }
      const illumination = light.computeLight(this.material, point, lightValue);
      color = color.add(illumination);
    });
    return color;
  }

}

export default Shape;