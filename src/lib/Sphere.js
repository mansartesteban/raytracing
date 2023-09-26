import Shape from "./Shape";
import Vector3 from "./Vector3";

class Sphere extends Shape {
  constructor(origin, radius, color) {
    super(color);
    this.origin = origin;
    this.radius = radius;
  }

  // intersect(ray) {
  //   const offset = Vector3.from(this.origin).to(ray.origin);
  //   const b = 2 * offset.dot(ray.direction);
  //   const c = offset.squid - this.radius * this.radius;
  //   const discriminant = b * b - 4 * c;
    
  //   if (discriminant < 0) {
  //     return [];
  //   }
  //   if (discriminant === 0) {
  //     return [-b / 2];
  //   }
    
  //   const root = Math.sqrt(discriminant);
  //   return [(-b - root) / 2, (-b + root) / 2];
  // }

  intersect = ray => {
    // Offset - the position of the sphere relative to the start of the ray
    let os = Vector3.from(this.origin).to(ray.origin);

    // Calculate a,b,c so we can plug them into the quadratic formula. Except
    // a should be the squared Euclidian distance of the ray direction,
    // but ray directions are normalised to a unit vector, so a will be 1, 
    // so we can ignore it.
    let b = 2 * os.dot(ray.direction);
    let c = os.squid - this.radius * this.radius;
    
    let discriminant = b * b - 4 * c;

    // If b^2-4ac is negative, the ray never intersects the sphere.
    // Math nerds: that means the quadratic equation has complex solutions ;)
    if (discriminant < 0) return [];

    // If the root is zero, the ray touches the surface of the sphere
    // but doesn't actually go through it, so there is only one intersection.        
    if (discriminant == 0) return [-b / 2 ];

    // Otherwise we have two intersections - one on the way in, one on the way out.
    let root = Math.sqrt(discriminant);
    return [ (-b - root) / 2, (-b + root) / 2 ];
};
}

export default Sphere;