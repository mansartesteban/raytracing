class Ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction.normalize();
  }

  trace(scene) {
    const distances = scene.objects.map(o => o.closest(this));
    const shortest = Math.min.apply(Math, distances);
    if (shortest === Infinity) return scene.background;
    const closest = scene.objects[distances.indexOf(shortest)];
    return closest.color;
  }
}

export default Ray;