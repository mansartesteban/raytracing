class Material {

    constructor() { };

    getColorAt() {
        throw "Classes which extend Material class must implement 'getColorAt' method";
    }
}

export default Material;