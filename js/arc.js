function Arc() {
  Object2D.call( this );

  this._startAngle = 0.0;
  this._endAngle   = 0.0;

  this._length = 0.0;
}

Arc.prototype = new Object2D();
Arc.prototype.constructor = Arc;

Arc.prototype.draw = function( ctx ) {
  if ( !this.isVisible() ) {
    return;
  }

  var angle = this.getAngle(),
      // Middle of arc line.
      radius = 0.5 * this._length + this.getDistance();

  ctx.beginPath();
  ctx.arc( this.getX(),
           this.getY(),
           radius,
           this._startAngle + angle,
           this._endAngle + angle );

  ctx.strokeStyle = this.getColor().toString();
  ctx.lineWidth = Math.abs( this._length );
  ctx.stroke();
};

Arc.prototype.getStartAngle = function() {
  return this._startAngle;
};

Arc.prototype.setStartAngle = function( startAngle ) {
  this._startAngle = startAngle;
  return this;
};

Arc.prototype.getEndAngle = function() {
  return this._endAngle;
};

Arc.prototype.setEndAngle = function( endAngle ) {
  this._endAngle = endAngle;
  return this;
};

Arc.prototype.getLength = function() {
  return this._length;
};

Arc.prototype.setLength = function( length ) {
  this._length = length;
  return this;
};
