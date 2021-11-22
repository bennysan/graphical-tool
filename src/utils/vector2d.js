export function Vector2d(_x, _y) {
  this.x = _x;
  this.y = _y;

  this.set = (x, y) => {
    this.x = x;
    this.y = x;
  };

  this.setX = (value) => {
    this.x = value;
  };

  this.setY = (value) => {
    this.y = value;
  };
}

export const vectorMath = {
  add: (u, v) => {
    if (v instanceof Vector2d) {
      return new Vector2d(u.x + v.x, u.y + v.y);
    }
    return new Vector2d(u.x + v, u.y + v);
  },

  substract: (u, v) => {
    if (v instanceof Vector2d) {
      return new Vector2d(u.x - v.x, u.y - v.y);
    }
    return new Vector2d(u.x - v, u.y - v);
  },

  multiply: (u, v) => {
    if (v instanceof Vector2d) {
      return new Vector2d(u.x * v.x, u.y * v.y);
    }
    return new Vector2d(u.x * v, u.y * v);
  },

  direction: (u, v) => {
    return vectorMath.substract(u, v);
  },

  magnitude: (u) => {
    return Math.sqrt(u.x * u.x + u.y * u.y);
  },

  normalize: (u) => {
    return new Vector2d(
      u.x / vectorMath.magnitude(u),
      u.y / vectorMath.magnitude(u)
    );
  },

  normal: (u) => {
    return new Vector2d(u.y, -u.x);
  },

  dot: (u, v) => {
    return u.x * v.x + u.y * v.y;
  },
};
