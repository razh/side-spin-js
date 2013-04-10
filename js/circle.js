function Circle() {
  Object2D.call( this );
}

Circle.prototype = new Object2D();
Circle.prototype.constructor = Circle;
