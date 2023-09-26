import Material from "../Material";

class BasicMaterial extends Material {
    constructor(color) {
        super();
        this.color = color;
    }

    getColorAt() {
        return this.color;
    };
}

export default BasicMaterial;