define(
  [ '../color',
    '../object2d',
    '../entities/physics-entity',
    '../actions/actions',
    '../math/interpolation' ],
  function( Color, Object2D, PhysicsEntity, Actions, Interpolation ) {
    var PI2 = 2 * Math.PI;

    var color = Actions.color,
        moveBy = Actions.moveBy,
        sequence = Actions.sequence,
        delay = Actions.delay,
        forever = Actions.forever,
        lengthBy = Actions.lengthBy,
        removeObject = Actions.removeObject;

    // World
    // -----
    // A world is made up of two entities (outer and inner) which
    // are composed of arcs.
    function World() {
      Object2D.call( this );

      this._outerEntity = new PhysicsEntity();
      this._innerEntity = new PhysicsEntity();

      this._outerEntity.setAngularVelocity( 40 * Math.PI / 180 );
      this._innerEntity.setAngularVelocity( -40 * Math.PI / 180 );

      this._outerRadius = 256.0;
      this._innerRadius = 128.0;

      this._backgroundColor = new Color( 127, 127, 127, 1.0 );
    }

    World.prototype = new Object2D();
    World.prototype.constructor = World;

    World.prototype.addTestActions = function() {
      this.addAction(
        sequence(
          delay( 1000 ),
          moveBy(  200,  200, 100, Interpolation.quad ),
          moveBy(    0, -200, 100, Interpolation.linear ),
          moveBy( -200,  200, 100, Interpolation.linear ),
          moveBy(    0, -200, 100, Interpolation.linear )
        )
      );

      this._outerEntity.addActionToChildren(
        color( new Color( 255, 0, 0, 1.0 ), 2000, Interpolation.expo10 )
      );

      var children = this._outerEntity.getChildren();
      var i, n;
      var increase, decrease;
      for ( i = 0, n = children.length; i < n; i++ ) {
        increase = Math.random() * 40 + 10;
        decrease = -increase;

        children[i].addAction(
          forever(
            sequence(
              lengthBy( decrease, Math.random() * 1000 + 1000, Interpolation.quintOut ),
              lengthBy( increase, Math.random() * 1000 + 1000, Interpolation.expo5 ),
              lengthBy( decrease, Math.random() * 1000 + 1000, Interpolation.expo5In ),
              lengthBy( increase, Math.random() * 1000 + 1000, Interpolation.quad )
            )
          )
        );
      }

      this._innerEntity.addActionToChildren(
        color( new Color( 255, 0, 0, 1.0 ), 2000, Interpolation.expo10 )
      );

      children = this._innerEntity.getChildren();
      for ( i = 0, n = children.length; i < n; i++ ) {
        increase = Math.random() * 40 + 10;
        decrease = -increase;

        children[i].addAction(
          forever(
            sequence(
              lengthBy( increase, Math.random() * 1000 + 1000, Interpolation.quintOut ),
              lengthBy( decrease, Math.random() * 1000 + 1000, Interpolation.expo5 ),
              lengthBy( increase, Math.random() * 1000 + 1000, Interpolation.expo5In ),
              lengthBy( decrease, Math.random() * 1000 + 1000, Interpolation.quad )
            )
          )
        );
      }
    };

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

      this.ensureSpacing( 50 );
    };

    World.prototype.ensureSpacing = function( spacing ) {
      var outerChildren = this._outerEntity.getChildren(),
          innerChildren = this._innerEntity.getChildren();

      var outerCount = outerChildren.length,
          innerCount = innerChildren.length;

      // Calculate offset and gear ratio.
      var angleOffset = this._outerEntity.getAngle() - this._innerEntity.getAngle(),
          indexOffset = angleOffset * outerCount / PI2,
          ratio = outerCount / innerCount;

      var outerChild, innerChild,
          outerIndex;
      var currentSpacing, delta;
      var r, g, b, a;
      for ( var i = 0; i < innerCount; i++ ) {
        // Find the corresponding arc on the outerRadius.
        // Outer radius is in opposite direction of inner radius (hence the negative).
        // The indexOffset how much we have to shift to get angleOffset.
        outerIndex = Math.floor( i * -ratio - indexOffset ) % outerCount;
        if ( outerIndex < 0 ) {
          outerIndex += outerCount;
        }

        innerChild = innerChildren[i];
        outerChild = outerChildren[ outerIndex ];

        r = Math.floor( Math.cos( innerChild.getStartAngle() ) * 255 );
        g = Math.floor( Math.sin( innerChild.getEndAngle() ) * 248 );
        b = Math.floor( Math.sin( innerChild.getEndAngle() ) * 184 );
        a = 1.0;

        if ( i === 0 ) {
          r = 0;
          g = 0;
          b = 255;
        }

        currentSpacing = ( outerChild.getDistance() + outerChild.getLength() ) -
                         ( innerChild.getDistance() + innerChild.getLength() );
        if ( currentSpacing < spacing ) {
          delta = 0.5 * ( spacing - currentSpacing );

          outerChild.lengthen(  delta );
          innerChild.lengthen( -delta );
        }

        innerChild.setColor( r, g, b, a );
        outerChild.setColor( r, g, b, a );
      }
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
