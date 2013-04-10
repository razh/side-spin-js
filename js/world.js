// World
// -----
// A world is made up of two entities (outer and inner) which
// are composed of arcs.
function World() {
  Object2D.call( this );

  this._outerEntity = new Entity();
  this._innerEntity = new Entity();

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

World.prototype.getOuterEntity = function() {
  return this._outerEntity;
};

World.prototype.addOuterShape = function( shape ) {
  this._outerEntity.addShape( shape );
};

World.prototype.getInnerEntity = function() {
  return this._innerEntity;
};

World.prototype.addInnerShape = function( shape ) {
  this._innerEntity
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
