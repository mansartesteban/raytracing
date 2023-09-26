import Ray from "./Ray";
import Vector3 from "./Vector3";

class Camera {
  
  constructor(location, lookAt, width = 16/8, height = 9/8) {
    this.location = location;
    this.lookAt = lookAt;

    // Avoid asymptote visual effects
    if (this.location.x == this.lookAt.x && this.location.x == this.lookAt.z) {
      this.location = this.location.add(new Vector3(0, 0, -.0000001));
    }

    this.direction = Vector3.from(this.location).to(this.lookAt).normalize();
    // this.direction = this.lookAt.add(this.location.invert()).normalize();

    this.right = Vector3.Y.cross(this.direction).normalize().multiply(width / 2);
    this.up = this.right.cross(this.direction).invert().normalize().multiply(height / 2);
  }

  trace(scene, x, y) {
    const vx = this.right.multiply(x);
    const vy = this.up.multiply(y).invert();
    const ray = new Ray(this.location, this.direction.add(vx).add(vy));
    return ray.trace(scene);
  }

}

export default Camera;