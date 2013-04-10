function Entity() {
  Object2D.call( this );

  this._objects = [];
}

Entity.prototype = new Object2D();
Entity.prototype.constructor = Entity;

Entity.prototype.update = function( elapsedTime ) {};

Entity.prototype.draw = function( ctx ) {
  if ( !this.isVisible() ) {
    return;
  }

  ctx.save();

  ctx.translate( this.getX(), this.getY() );
  ctx.rotate( this.getAngle() );

  this.drawObjects( ctx );

  ctx.restore();
};

Entity.prototype.drawObjects = function( ctx ) {
  var objects = this.getObjects();
  for ( var i = 0, n = objects.length; i < n; i++ ) {
    objects[i].draw( ctx );
  }
};

Entity.prototype.getObjects = function() {
  return this._objects;
};

Entity.prototype.addObject = function( object ) {
  this.getObjects().push( object );
  return this;
};

Entity.prototype.removeObject = function( object ) {
  var objects = this.getObjects();
  var index = objects.indexOf( object );
  if ( index !== -1 ) {
    object.splice( index, 1 );
  }

  return this;
};

// JSON.
Entity.prototype.fromJSON = function( json ) {
  Object2D.prototype.fromJSON.call( this, json );

  var jsonObject = JSON.parse( json );

  return this;
};

Entity.prototype.toJSON = function() {
  var object = {};

  return object;
};
