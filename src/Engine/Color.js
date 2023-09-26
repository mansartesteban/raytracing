class Color {

  static Black = new Color(0, 0, 0);
  static Grey = new Color(0x7f, 0x7f, 0x7f);
  static White = new Color(0xff, 0xff, 0xff);
  static Red = new Color(0xff, 0, 0);
  static Green = new Color(0, 0xff, 0);
  static Blue = new Color(0, 0, 0xff);
  static Yellow = new Color(0xff, 0xff, 0);
  static Cyan = new Color(0, 0xff, 0xff);
  static Fuchsia = new Color(0xff, 0, 0xff);

  #r = 0;
  #g = 0;
  #b = 0;

  constructor(r, g, b) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
  }

  get r() {
    return this.#r;
  }

  get g() {
    return this.#g;
  }

  get b() {
    return this.#b;
  }

  get rgba() {
    return [this.r, this.g, this.b, 0xff];
  }

  get html() { return `rgb(${this.r},${this.g},${this.b})`; };

  add(c) {
    if (c instanceof Color) {
      return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    } else if (typeof (c) === "number") {
      return new Color(this.r + c, this.g + c, this.b + c);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (v) + "'. It should be a number or a Color";
    }
  }

  multiply(c) {
    if (c instanceof Color) {
      return new Color(Math.floor(this.r * c.r / 0xff), Math.floor(this.g * c.g / 0xff), Math.floor(this.b * c.b / 0xff));
    } else if (typeof (c) === "number") {
      return new Color(this.r * c, this.g * c, this.b * c);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (v) + "'. It should be a number or a Color";
    }
  }

}

export default Color;