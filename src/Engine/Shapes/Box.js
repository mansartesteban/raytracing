import { THRESHOLD } from "@/settings";
import Vector3 from "../Geometry/Vector3";
import Shape from "../Shape";

const axes = ["x", "y", "z"];

class Box extends Shape {
    constructor(corner1, corner2, appearance) {
        super(appearance);
        this.lowerCorner = new Vector3(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.min(corner1.z, corner2.z));
        this.upperCorner = new Vector3(Math.max(corner1.x, corner2.x), Math.max(corner1.y, corner2.y), Math.max(corner1.z, corner2.z));
        this.vertices = [this.lowerCorner, this.upperCorner];
    }

    contains(point, axis) {
        return this.lowerCorner[axis] < point[axis] && point[axis] < this.upperCorner[axis];
    }

    intersectOnAxis(axis, ray) {
        const [o1, o2] = axes.filter(a => a != axis);
        const intersections = [];
        if (ray.direction[axis] === 0) {
            return [];
        }
        this.vertices.forEach(vertex => {
            const intersect = (vertex[axis] - ray.origin[axis]) / ray.direction[axis];
            const point = ray.origin.add(ray.direction.multiply(intersect));
            if (this.contains(point, o1) && this.contains(point, o2)) {
                intersections.push(intersect);
            }
        });
        return intersections;
    }

    intersect(ray) {
        return this.intersectOnAxis("x", ray).concat(this.intersectOnAxis("y", ray)).concat(this.intersectOnAxis("z", ray));
    }

    getNormalAt(pos) {
        if (Math.abs(this.lowerCorner.x - pos.x) < THRESHOLD) return Vector3.X.invert();
        if (Math.abs(this.upperCorner.x - pos.x) < THRESHOLD) return Vector3.X;
        if (Math.abs(this.lowerCorner.y - pos.y) < THRESHOLD) return Vector3.Y.invert();
        if (Math.abs(this.upperCorner.y - pos.y) < THRESHOLD) return Vector3.Y;
        if (Math.abs(this.lowerCorner.z - pos.z) < THRESHOLD) return Vector3.Z.invert();
        if (Math.abs(this.upperCorner.z - pos.z) < THRESHOLD) return Vector3.Z;
    }
}

export default Box;