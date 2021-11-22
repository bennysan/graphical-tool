function Vector2d(_x, _y) {
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
