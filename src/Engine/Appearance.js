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
}

export default Appearance;