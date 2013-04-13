define(
  [ './world',
    '../color',
    '../shapes/arc' ],
  function( World, Color, Arc ) {
    var PI2 = 2 * Math.PI;

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
        outerEntity.addChild( arc );

        // Create inner arc.
        arc = new Arc().setDistance( this._innerRadius )
                       .setStartAngle( startAngle )
                       .setEndAngle( startAngle + angle )
                       .setLength( this._innerLength * Math.random() )
                       .setColor( this._arcColor );
        innerEntity.addChild( arc );

        // Rotate.
        startAngle += angle;
      }

      world.addTestActions();

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

    return WorldBuilder;
});
