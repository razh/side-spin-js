define([
  'color'
], function( Color ) {
  'use strict';

  function Game() {
    this.WIDTH  = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    this._canvas = document.createElement( 'canvas' );

    this._canvas.width  = this.WIDTH;
    this._canvas.height = this.HEIGHT;

    document.body.appendChild( this._canvas );

    this._ctx = this._canvas.getContext( '2d' );

    this._backgroundColor = new Color( 0, 0, 0, 1.0 );

    this._prevTime = Date.now();
    this._currTime = this._prevTime;
    this._running  = true;

    this._objects = [];

    this.input = {
      keys: []
    };

    this.EPSILON = 1e-5;
  }

  // Super lazy singleton.
  Game.instance = null;

  Game.prototype.tick = function() {
    this.act();
    this.draw();
  };

  Game.prototype.act = function() {
    this._currTime = Date.now();
    var delta = this._currTime - this._prevTime;
    this._prevTime = this._currTime;

    if ( delta > 1e2 ) {
      delta = 1e2;
    }

    this.getObjects().forEach(function( object ) {
      object.act( delta );
    });
  };

  Game.prototype.draw = function() {
    this._canvas.style.backgroundColor = this.getBackgroundColor().toHexString();

    var ctx = this._ctx;

    ctx.clearRect( 0, 0, this.WIDTH, this.HEIGHT );

    ctx.save();
    // Origin is at bottom left corner in OpenGL.
    ctx.translate( 0, this.HEIGHT );
    ctx.scale( 1, -1 );

    this.getObjects().forEach(function( object ) {
      object.draw( ctx );
    });

    ctx.restore();
  };

  Game.prototype.getObjects = function() {
    return this._objects;
  };

  Game.prototype.addObject = function( object ) {
    this.getObjects().push( object );
    object.setParent( this );
  };

  Game.prototype.removeObject = function( object ) {
    var objects = this.getObjects(),
        index = objects.indexOf( object );

    if ( index !== -1 ) {
      objects.splice( index, 1 )[0].setParent( null );
    }
  };

  // Background color.
  Game.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  };

  Game.prototype.setBackgroundColor = function() {
    this.getBackgroundColor().set.apply( this.getBackgroundColor(), arguments );
  };

  Game.prototype.isRunning = function() {
    return this._running;
  };

  Game.prototype.stop = function() {
    this._running = false;
  };

  return Game;
});
