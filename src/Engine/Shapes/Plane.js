import Shape from "@/Engine/Shape";

class Plane extends Shape {
    constructor(distance, normal, appearance) {
        super(appearance);
        this.distance = distance;
        this.normal = normal;
    }

    intersect(ray) {
        const angle = ray.direction.dot(this.normal);
        if (angle === 0) {
            return;
        }

        const b = this.normal.dot(ray.origin.sub(this.normal.multiply(this.distance)));
        return [-b / angle];
    }

    getNormalAt() {
        return this.normal;
    }

}

export default Plane;