function PlayerEntity() {
  PhysicsEntity.call( this );

  // Polar coordinates.
  // The position of the player is defined by the angle and the
  // radius of the circle on which it is tracing.
  this._angle  = 0;
  this._radius = 0;
}

PlayerEntity.prototype = new PhysicsEntity();
PlayerEntity.prototype.constructor = PlayerEntity;

PlayerEntity.prototype.draw = function( ctx ) {
};
