class Vector2 {

  static X = new Vector2(1, 0);
  static Y = new Vector2(0, 1);
  static O = new Vector2(0, 0);

  #x = 0;
  #y = 0;
  #length = 0;
  #squid = 0;
  
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get length() {
    return this.#length ??= Math.sqrt(this.squid);
  }

  get squid() {
    return this.#squid ??= this.x * this.x + this.y * this.y;
  }

  dot(v) {
    if (!(v instanceof Vector2)) throw "Unable to compute a dot product on non Vector2 object";
    return this.x * v.x + this.y * v.y;
  }

  add(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x + v.x, this.y + v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x + v, this.y + v);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  sub(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x - v.x, this.y - v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x - v, this.y - v);
    } else {
      throw "Unable to compute a subsraction on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  divide(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x / v.x, this.y / v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x / v, this.y / v);
    } else {
      throw "Unable to compute a division on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  multiply(v) {
    if (v instanceof Vector2) {
      return new Vector2(this.x * v.x, this.y * v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x * v, this.y * v);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  normalize() {
    return this.divide(this.length);
  }

  invert() {
    return new Vector2(-this.x, -this.y);
  }

  static from(origin) {
    return {
      to: target => target.subtract(origin)
    }
  }

}

export default Vector2;