define(
  [ '../game',
    './physics-entity',
    '../color',
    '../math/interpolation',
    '../actions/actions',
    '../shapes/circle' ],
  function( Game, PhysicsEntity, Color, Interpolation, Actions, Circle ) {
    var color = Actions.color,
        delay = Actions.delay,
        sequence = Actions.sequence,
        distanceBy = Actions.distanceBy;

    var PI2 = 2 * Math.PI;

    function PlayerEntity() {
      PhysicsEntity.call( this );

      this._circle = new Circle()
        .setRadius( 20 )
        .setColor( 172, 191, 204, 1.0 );

      this.addChild( this._circle );
      // this.setAngularVelocity( 20 * Math.PI / 180 );

      this.addActionToChildren(
        delay( 1000 ),
        color( new Color( 0, 0, 127, 1.0 ), 1000, Interpolation.quad )
      );

      this.addAction(
          sequence(
            distanceBy( 200, 200, Interpolation.quadOut ),
            distanceBy( -200, 500, Interpolation.linear )
          )
      );

      this._world = null;
    }

    PlayerEntity.prototype = new PhysicsEntity();
    PlayerEntity.prototype.constructor = PlayerEntity;

    PlayerEntity.prototype.act = function( delta ) {
      PhysicsEntity.prototype.act.call( this, delta );

      if ( this.getDistance() < 0 ) {
        this.setDistance(0);
      }

      var radialVelocity = 0;
      if ( Game.instance.input.keys[ 37 ] ) {
        radialVelocity -= 300;
      }

      if ( Game.instance.input.keys[ 39 ] ) {
        radialVelocity += 300;
      }

      this.setRadialVelocity( radialVelocity );

      // Check if collides with world.
      var world = this.getWorld();
      if ( world === null ) {
        return;
      }

      var outerEntity = world.getOuterEntity(),
          innerEntity = world.getInnerEntity(),
          children = outerEntity.getChildren();

      var angle = ( this.getAngle() - outerEntity.getAngle() ) % PI2;
      if ( angle < 0 ) {
        angle += PI2;
      }

      var child;
      var i, n;
      for ( i = 0, n = children.length; i < n; i++ ) {
        child = children[i];

        // child.setColor( 255, 0, 0, 1.0 );
        if ( child.intersectsCircle( angle, this.getDistance(), this._circle.getRadius() ) ) {
          child.setColor( 0, 0, 255, 1.0 );
        }
      }

      children = innerEntity.getChildren();
      angle = ( this.getAngle() - innerEntity.getAngle() ) % PI2;
      if ( angle < 0 ) {
        angle += PI2;
      }

      for ( i = 0, n = children.length; i < n; i++ ) {
        child = children[i];

        // child.setColor( 255, 0, 0, 1.0 );
        if ( child.intersectsCircle( angle, this.getDistance(), this._circle.getRadius() ) ) {
          child.setColor( 0, 0, 255, 1.0 );
        }
      }
    };

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

    PlayerEntity.prototype.getWorld = function() {
      return this._world;
    };

    PlayerEntity.prototype.setWorld = function( world ) {
      this._world = world;
      return this;
    };

    return PlayerEntity;
  }
);
