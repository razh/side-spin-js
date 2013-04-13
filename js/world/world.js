define(
  [ '../color',
    '../object2d',
    '../entities/physics-entity',
    '../actions/actions',
    '../math/interpolation' ],
  function( Color, Object2D, PhysicsEntity, Actions, Interpolation ) {
    var PI2 = 2 * Math.PI;

    var moveBy   = Actions.moveBy,
        sequence = Actions.sequence;
        var delay = Actions.delay;
        var removeObject = Actions.removeObject;
    // World
    // -----
    // A world is made up of two entities (outer and inner) which
    // are composed of arcs.
    function World() {
      Object2D.call( this );

      this._outerEntity = new PhysicsEntity();
      this._innerEntity = new PhysicsEntity();

      this._outerEntity.setAngularVelocity( 30 * Math.PI / 180 );
      this._innerEntity.setAngularVelocity( -30 * Math.PI / 180 );

      this._outerRadius = 256.0;
      this._innerRadius = 128.0;

      this._backgroundColor = new Color( 127, 127, 127, 1.0 );

      this.addAction(
        sequence(
          delay( 2000 ),
          moveBy(  200,  200, 1000, Interpolation.quad ),
          moveBy(    0, -200, 1000, Interpolation.linear ),
          moveBy( -200,  200, 1000, Interpolation.linear ),
          moveBy(    0, -200, 1000, Interpolation.linear )
        )
      );
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

    World.prototype.act = function( delta ) {
      Object2D.prototype.act.call( this, delta );

      this._outerEntity.act( delta );
      this._innerEntity.act( delta );
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

    return World;
  }
);
