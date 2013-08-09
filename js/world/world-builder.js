define([
  'world/world',
  'color',
  'shapes/arc'
], function( World, Color, Arc ) {
  'use strict';

  var PI2 = 2 * Math.PI;

  function WorldBuilder() {
    this._outerCount = 32;
    this._innerCount = 32;

    this._outerRadius = 384.0;
    this._innerRadius = 48.0;

    this._outerLength = 144.0;
    this._innerLength = 144.0;

    this._arcColor = new Color();
  }

  WorldBuilder.prototype.create = function() {
    var startAngle = 0.0,
        outerAngle = PI2 / this._outerCount,
        innerAngle = PI2 / this._innerCount;

    var world = new World(),
        outerEntity = world.getOuterEntity(),
        innerEntity = world.getInnerEntity();

    // Some offsets to hide visual errors.
    world.setOuterRadius( this._outerRadius - 1 )
         .setInnerRadius( this._innerRadius + 1 );

    var arc, i;
    for ( i = 0; i < this._outerCount; i++ ) {
      // Create outer arc.
      arc = new Arc()
       .setDistance( this._outerRadius )
       .setStartAngle( startAngle )
       .setEndAngle( startAngle + outerAngle )
       .setLength( -this._outerLength * Math.random() )
       .setColor( this._arcColor ); // Negative, towards center.

      outerEntity.addChild( arc );

      // Rotate.
      startAngle += outerAngle;
    }

    // Reset.
    for ( i = 0; i < this._innerCount; i++ ) {
      // Create inner arc.
      arc = new Arc()
        .setDistance( this._innerRadius )
        .setStartAngle( startAngle )
        .setEndAngle( startAngle + innerAngle )
        .setLength( this._innerLength * Math.random() )
        .setColor( this._arcColor );

      innerEntity.addChild( arc );

      // Rotate.
      startAngle -= innerAngle;
    }

    world.addTestActions();

    return world;
  };

  WorldBuilder.prototype.setCount = function( count ) {
    this.setOuterCount( count );
    this.setInnerCount( count );
    return this;
  };

  WorldBuilder.prototype.setOuterCount = function( outerCount ) {
    this._outerCount = outerCount;
    return this;
  };

  WorldBuilder.prototype.setInnerCount = function( innerCount ) {
    this._innerCount = innerCount;
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
