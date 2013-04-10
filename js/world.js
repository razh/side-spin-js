// World
// -----
// A world is made up of two entities (outer and inner) which
// are composed of arcs.
function World() {
  Object2D.call( this );

  this._outerEntity = new PhysicsEntity();
  this._innerEntity = new PhysicsEntity();

  this._outerEntity.setAngularVelocity( 10 * Math.PI / 180 );
  this._innerEntity.setAngularVelocity( -10 * Math.PI / 180 );

  this._outerRadius = 256.0;
  this._innerRadius = 128.0;

  this._backgroundColor = new Color( 127, 127, 127, 1.0 );

  this._color.set( 127, 0, 0, 1.0 );
}

World.prototype = new Object2D();
World.prototype.constructor = World;

World.prototype.draw = function( ctx ) {
  ctx.save();

  ctx.translate( this.getX(), this.getY() );

  ctx.beginPath();
  ctx.arc( 0, 0, this._outerRadius, 0, PI2 );
  ctx.fillStyle = this.getColor().toString();
  ctx.fill();

  // Just draw the inner circle with background color.
  ctx.beginPath();
  ctx.arc( 0, 0, this._innerRadius, 0, PI2 );
  ctx.fillStyle = this.getBackgroundColor().toString();
  ctx.fill();

  this._outerEntity.draw( ctx );
  this._innerEntity.draw( ctx );

  ctx.restore();
};

World.prototype.update = function( elapsedTime ) {
  this._outerEntity.update( elapsedTime );
  this._innerEntity.update( elapsedTime );
};

// Entities.
World.prototype.getOuterEntity = function() {
  return this._outerEntity;
};

World.prototype.getInnerEntity = function() {
  return this._innerEntity;
};

// Radii.
World.prototype.getOuterRadius = function() {
  return this._outerRadius;
};

World.prototype.setOuterRadius = function( outerRadius ) {
  this._outerRadius = outerRadius;
  return this;
};

World.prototype.getInnerRadius = function() {
  return this._innerRadius;
};

World.prototype.setInnerRadius = function( innerRadius ) {
  this._innerRadius = innerRadius;
  return this;
};

// Background color.
World.prototype.getBackgroundColor = function()  {
  return this._backgroundColor;
};

World.prototype.setBackgroundColor = function() {
  this.getBackgroundColor().set.apply( this.getBackgroundColor(), arguments );
  return this;
};

// WorldBuilder
// ------------
function WorldBuilder() {
  this._count = 32;

  this._outerRadius  = 256.0;
  this._innerRadius  = 128.0;

  this._outerLength = 24.0;
  this._innerLength = 24.0;

  this._arcColor = new Color();
}

WorldBuilder.prototype.create = function() {
  var startAngle = 0.0,
      angle = PI2 / this._count;

  var world = new World(),
      outerEntity = world.getOuterEntity(),
      innerEntity = world.getInnerEntity();

  world.setOuterRadius( this._outerRadius )
       .setInnerRadius( this._innerRadius );

  var arc;
  for ( var i = 0; i < this._count; i++ ) {
    // Create outer arc.
    arc = new Arc().setDistance( this._outerRadius )
                   .setStartAngle( startAngle )
                   .setEndAngle( startAngle + angle )
                   .setLength( -this._outerLength * Math.random() )
                   .setColor( this._arcColor ); // Negative, towards center.
    outerEntity.addObject( arc );

    // Create inner arc.
    arc = new Arc().setDistance( this._innerRadius )
                   .setStartAngle( startAngle )
                   .setEndAngle( startAngle + angle )
                   .setLength( this._innerLength * Math.random() )
                   .setColor( this._arcColor );
    innerEntity.addObject( arc );

    // Rotate.
    startAngle += angle;
  }

  return world;
};

WorldBuilder.prototype.setCount = function( count ) {
  this._count = count;
  return this;
};

WorldBuilder.prototype.setOuterRadius = function( outerRadius ) {
  this._outerRadius = outerRadius;
  return this;
};

WorldBuilder.prototype.setInnerRadius = function( innerRadius ) {
  this._innerRadius = innerRadius;
  return this;
};

WorldBuilder.prototype.setOuterLength = function( outerLength ) {
  this._outerLength = outerLength;
  return this;
};

WorldBuilder.prototype.setInnerLength = function( innerLength ) {
  this._innerLength = innerLength;
  return this;
};

WorldBuilder.prototype.setArcColor = function() {
  this._arcColor.set.apply( this._arcColor, arguments );
  return this;
};
