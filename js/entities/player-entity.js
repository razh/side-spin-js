define(
  [ './physics-entity',
    '../color',
    '../math/interpolation',
    '../actions/actions',
    '../shapes/circle' ],
  function( PhysicsEntity, Color, Interpolation, Actions, Circle ) {
    var color = Actions.color,
        delay = Actions.delay,
        remove = Actions.remove,
        sequence = Actions.sequence,
        distanceBy = Actions.distanceBy;

    function PlayerEntity() {
      PhysicsEntity.call( this );

      this.addChild( new Circle().setRadius( 20 )
                                 .setColor( 172, 191, 204, 1.0 ) );
      this.setAngularVelocity( 60 * Math.PI / 180 );

      this.addAction(
        delay( 1000 ),
        color( new Color( 0, 0, 127, 1.0 ), 1000, Interpolation.quad ),
        remove()
      );

      this.addAction(
          sequence(
            distanceBy( 200, 200, Interpolation.quadOut ),
            distanceBy( -200, 500, Interpolation.linear )
          )
      );
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

      this.drawChildren( ctx );

      ctx.restore();
    };

    return PlayerEntity;
  }
);
