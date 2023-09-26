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
  
  get html() { return `rgb(${this.r},${this.g},${this.b})` };

  add(c) {
    return new Color(this.r + c.r(), this.g + c.g(), this.b + c.b());
  }

  multiply(c) {
    let r = Math.floor(this.r * c.r() / 0xff);
    let g = Math.floor(this.g * c.g() / 0xff);
    let b = Math.floor(this.b * c.b() / 0xff);
    return new Color(r, g, b);
  }

  scale(f) {
    return new Color(this.r * f, this.g * f, this.b * f);
  }

}

export default Color;