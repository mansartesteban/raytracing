import Color from "./Color";
import Ray from "./Ray";

class Appearance {
    constructor(material, finish) {
        this.material = material;
        this.finish = finish;
    }

    #getColorAt(point) {
        return this.material.getColorAt(point);
    }

    getAmbiantColorAt(point) {
        return this.#getColorAt(point).multiply(this.finish.ambiant);
    }
    getDiffuseColorAt(point) {
        return this.#getColorAt(point).multiply(this.finish.diffuse);
    }

    reflect(point, reflexion, scene, depth) {
        if (!this.finish.reflexion) {
            return Color.Black;
        }

        const reflectedRay = new Ray(point, reflexion);
        const reflectedColor = reflectedRay.trace(scene, depth);
        return reflectedColor.multiply(this.finish.reflexion);
    }
}

export default Appearance;