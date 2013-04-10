function WorldSegment() {
  Object2D.call( this );

  this._startAngle = 0;
  this._endAngle = 0;

  this._length = 0;
}

WorldSegment.prototype = new Object2D();
WorldSegment.prototype.constructor = WorldSegment;

WorldSegment.prototype.draw = function( ctx ) {

};

// World
// -----
// A world is made up of segments.
function World() {
  Object2D.call( this );

  this._outerSegments = [];
  this._innerSegments = [];

  this._outerRadius = 100;
  this._innerRadius = 75;
}

World.PI2 = 2 * Math.PI;

World.prototype = new Object2D();
World.prototype.constructor = World;

World.prototype.draw = function( ctx ) {
  ctx.arc( this.getX(), this.getY(), this._outerRadius, 0, World.PI2 );
  ctx.fillStyle = this.getColor().toString();
  ctx.fill();

  ctx.globalCompositeOperation = 'xor';
  ctx.arc( this.getX(), this.getY(), this._innerRadius, 0, World.PI2 );
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
};


// WorldBuilder
// ------------
function WorldBuilder() {
  this._segmentCount = 32;
  this._outerRadius  = 100;
  this._innerRadius  = 75;
}

WorldBuilder.prototype.setSegmentCount = function( segmentCount ) {
  this._segmentCount = segmentCount;
  return this;
};

WorldBuilder.prototype.setOuterRadius = function( outerRadius ) {
  this._outerRadius = outerRadius;
  return this;
};

WorldBuilder.prototype.setInnerRadius = function( innerRadius ) {
  this._innerRadius = innerRadius;
};
