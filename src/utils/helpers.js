export function Vec2(x, y) {
  this.x = x;
  this.y = y;

  this.set = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  };

  this.magSq = function () {
    // returns the length of the vector, squared.
    var x = this.x,
      y = this.y;
    return x * x + y * y;
  };

  this.mag = function () {
    // returns the length of the vector.
    return Math.sqrt(this.magSq());
  };

  this.add = function (x, y) {
    // add two vectors together, or add x and y values
    if (x instanceof Vec2) {
      // to an existing vector.
      this.x += x.x; // v.add(x_val, y_val) OR v.add(v2)
      this.y += x.y;
      return this;
    }
    this.x += x;
    this.y += y;
    return this;
  };

  this.sub = function (x, y) {
    // same as above, with subtraction
    if (x instanceof Vec2) {
      this.x -= x.x;
      this.y -= x.y;
      return this;
    }
    this.x -= x;
    this.y -= y;
    return this;
  };

  this.div = function (n) {
    // divide vector length (ie magnitude) by a constant
    this.x /= n; // v.div(divisor)
    this.y /= n;
    return this;
  };

  this.mult = function (n) {
    // multiply vector length (ie magnitude) by a constant
    this.x *= n; // v.mult(scalar)
    this.y *= n;
    return this;
  };

  this.normalize = function () {
    // set magnitude equal to 1
    return this.div(this.mag()); // v.normalize()
  };
}

export const getObjectPos = (transforms) => {
  // console.log(transforms);
  const objectPos = new Vec2(
    transforms.x + transforms.width / 2,
    transforms.y + transforms.height / 2
  );
  return objectPos;
};

export function lerp(n0, n1, t) {
  return n0 + t * (n1 - n0);
}

export const remap = (InputA, InputB, OutputA, OutputB, value) => {
  return ((value - InputA) / (InputB - InputA)) * (OutputB - OutputA) + OutputA;
};
