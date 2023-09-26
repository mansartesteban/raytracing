import Shape from "@/Engine/Shape";
import Vector3 from "@/Engine/Geometry/Vector3";

class Sphere extends Shape {
  constructor(origin, radius, appearance) {
    super(appearance);
    this.origin = origin;
    this.radius = radius;
  }

  getNormalAt(point) {
    return point.sub(this.origin).normalize();
  }

  intersect(ray) {
    const offset = Vector3.from(this.origin).to(ray.origin);
    const b = 2 * offset.dot(ray.direction);
    const c = offset.squid - this.radius * this.radius;
    const discriminant = b * b - 4 * c;

    if (discriminant < 0) {
      return [];
    }
    if (discriminant === 0) {
      return [-b / 2];
    }

    const root = Math.sqrt(discriminant);
    return [(-b - root) / 2, (-b + root) / 2];
  }

}

export default Sphere;