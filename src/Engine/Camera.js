import Ray from "./Ray";
import Vector3 from "@/Engine/Geometry/Vector3";

class Camera {

  constructor(position, lookAt, width = 16 / 8, height = 9 / 8) {
    this.position = position;
    this.lookAt = lookAt;

    // Avoid asymptote visual effects
    if (this.position.x == this.lookAt.x && this.position.x == this.lookAt.z) {
      this.position = this.position.add(new Vector3(0, 0, -.0000001));
    }

    this.direction = Vector3.from(this.position).to(this.lookAt).normalize();
    // this.direction = this.lookAt.add(this.position.invert()).normalize();

    this.right = Vector3.Y.cross(this.direction).normalize().multiply(width / 2);
    this.up = this.right.cross(this.direction).invert().normalize().multiply(height / 2);
  }

  trace(scene, x, y) {
    const vx = this.right.multiply(x);
    const vy = this.up.multiply(y).invert();
    const ray = new Ray(this.position, this.direction.add(vx).add(vy));
    return ray.trace(scene);
  }

}

export default Camera;