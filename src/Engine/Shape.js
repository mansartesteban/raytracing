import { THRESHOLD } from "@/settings";
import Color from "./Color";
import Vector3 from "@/Engine/Geometry/Vector3";
import Ray from "./Ray";
import Finish from "./Finish";

class Shape {

  constructor(appearance) {
    this.appearance = appearance;
    if (!this.appearance.finish) {
      this.appearance.finish = Finish.Default;
    }
  }

  intersect() {
    throw "Classes which extend Shape class must implements 'intersect' method";
  }

  getNormalAt() {
    throw "Classes which extend Shape class must implements 'getNormalAt' method";
  }

  castShadow(point, lightDirection) {
    const distanceToLight = lightDirection.length;
    const ray = new Ray(point, lightDirection);
    return this.closest(ray) <= distanceToLight;
  }

  closest(ray) {
    const intersections = this.intersect(ray).filter(d => d > THRESHOLD);
    return Math.min.apply(Math, intersections);
  }

  reflect(incident, normal) {
    const inverse = incident.invert();
    return inverse.add(normal.multiply(normal.dot(inverse)).add(incident).multiply(2));
  }

  getColorAt(point, ray, scene, depth) {
    const normal = this.getNormalAt(point);
    let color = Color.Black;
    const reflexion = ray.reflect(normal);
    
    const reflect = this.appearance.reflect(point, reflexion, scene, depth)
    color = color.add(reflect);

    scene.lights.forEach(light => {
      const v = Vector3.from(point).to(light.position);
      const lightValue = normal.dot(v.normalize());

      if (scene.objects.some(object => object.castShadow(point, v))) {
        return;
      }

      if (lightValue <= 0) {
        return;
      }
      const illumination = light.computeLight(this.appearance, point, lightValue);
      color = color.add(illumination);

      const highlight = this.appearance.finish.addHighlight(reflexion, light, v);
      color = color.add(highlight);
    });
    return color;
  }

}

export default Shape;