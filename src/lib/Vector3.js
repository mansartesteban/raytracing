class Vector3 {

  static X = new Vector3(1, 0, 0);
  static Y = new Vector3(0, 1, 0);
  static Z = new Vector3(0, 0, 1);
  static O = new Vector3(0, 0, 0);

  #x = 0;
  #y = 0;
  #z = 0;
  #length = null;
  #squid = null;

  constructor(x, y, z) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get z() {
    return this.#z;
  }

  get length() {
    return this.#length ??= Math.sqrt(this.squid);
  }

  get squid() {
    return this.#squid ??= this.x * this.x + this.y * this.y + this.z * this.z;
  }

  dot(v) {
    if (!(v instanceof Vector3)) throw "Unable to compute a dot product on non Vector3 object";
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
  }

  add(v) {
    if (v instanceof Vector3) {
      return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    } else if (typeof (v) === "number") {
      return new Vector3(this.x + v, this.y + v, this.z + v);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (v) + "'. It should be a number or a Vector3";
    }
  }

  sub(v) {
    if (v instanceof Vector3) {
      return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    } else if (typeof (v) === "number") {
      return new Vector3(this.x - v, this.y - v, this.z - v);
    } else {
      throw "Unable to compute a subsraction on the type '" + typeof (v) + "'. It should be a number or a Vector3";
    }
  }

  divide(v) {
    if (v instanceof Vector3) {
      return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
    } else if (typeof (v) === "number") {
      return new Vector3(this.x / v, this.y / v, this.z / v);
    } else {
      throw "Unable to compute a division on the type '" + typeof (v) + "'. It should be a number or a Vector3";
    }
  }

  multiply(v) {
    if (v instanceof Vector3) {
      return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
    } else if (typeof (v) === "number") {
      return new Vector3(this.x * v, this.y * v, this.z * v);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (v) + "'. It should be a number or a Vector3";
    }
  }

  normalize() {
    return this.divide(this.length);
  }

  invert() {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  static from(origin) {
    return {
      to: target => target.sub(origin)
    }
  }

}

export default Vector3;