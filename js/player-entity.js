function PlayerEntity() {
  PhysicsEntity.call( this );

  this.addObject( new Circle().setRadius( 20 )
                              .setColor( 172, 191, 204, 1.0 ) );
}

PlayerEntity.prototype = new PhysicsEntity();
PlayerEntity.prototype.constructor = PlayerEntity;

PlayerEntity.prototype.draw = function( ctx ) {
  if ( !this.isVisible() ) {
    return;
  }

  ctx.save();

  ctx.translate( this.getX(), this.getY() );
  ctx.rotate( this.getAngle() );
  ctx.translate( this.getDistance(), 0 );

  this.drawObjects( ctx );

  ctx.restore();
};
