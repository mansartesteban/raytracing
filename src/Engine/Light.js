import Vector3 from "@/Engine/Geometry/Vector3";

class Light {

    #position;
    #color;
    #brightness;

    constructor(position = new Vector3(), color = new Color(), brightness = 1) {
        this.#position = position;
        this.#color = color;
        this.#brightness = brightness;
    }

    get position() {
        return this.#position;
    }
    get color() {
        return this.#color;
    }
    get brightness() {
        return this.#brightness;
    }

    set position(position) {
        if (!(position instanceof Vector3)) {
            throw "position must be a 'Vector3'";
        }
        this.#position = position;
    }

    set color(color) {
        if (!(color instanceof Color)) {
            throw "color must be a 'Color'";
        }
        this.#color = color;
    }

    set brightness(brightness) {
        this.#brightness = brightness;
    }

    computeLight(appearance, point, lightValue) {
        return appearance.getDiffuseColorAt(point).multiply(this.color).multiply(lightValue).multiply(this.brightness);
    }
}

export default Light;