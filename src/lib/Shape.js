import { THRESHOLD } from "./settings";

class Shape {
  
  constructor(color) {
    this.color = color;
  }
  
  intersect() {
    throw "Classes which extends Shape class must implements 'intersect' method"
  }

  closest(ray) {
    const intersections = this.intersect(ray).filter(d => d > THRESHOLD);
    return Math.min.apply(Math, intersections);
  }

}

export default Shape;