import Color from "./Color";

class Finish {
    static Default = new Finish();

    constructor(options = []) {
        this.ambiant = options.ambiant ?? 0;
        this.diffuse = options.diffuse ?? 0.7;
        this.shiny = options.shiny ?? 0;
    }

    addHighlight(reflexion, light, lightVector) {
        if (!this.shiny) {
            return Color.Black;
        }

        let intensity = reflexion.dot(lightVector.normalize());
        if (intensity <= 0) {
            return Color.Black;
        }

        const exponent = 32 * this.shiny * this.shiny;
        intensity = Math.pow(intensity, exponent);
        return light.color.multiply(this.shiny * intensity);
    }
}

export default Finish;