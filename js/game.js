define(
  [ 'color' ],
  function( Color ) {
    function Game() {
      this.WIDTH  = window.innerWidth;
      this.HEIGHT = window.innerHeight;

      this._canvas = document.createElement( 'canvas' );

      this._canvas.width  = this.WIDTH;
      this._canvas.height = this.HEIGHT;

      document.body.appendChild( this._canvas );

      this._ctx = this._canvas.getContext( '2d' );

      this._backgroundColor = new Color( 127, 127, 127, 1.0 );

      this._prevTime = Date.now();
      this._currTime = this._prevTime;
      this._running = true;

      this._entities = [];

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

      if ( delta > 1e3 ) {
        delta = 1e3;
      }

      var entities = this.getEntities();
      for ( var i = 0, n = entities.length; i < n; i++ ) {
        entities[i].act( delta );
      }
    };

    Game.prototype.draw = function() {
      this._canvas.style.backgroundColor = this.getBackgroundColor().toHexString();

      this._ctx.clearRect( 0, 0, this.WIDTH, this.HEIGHT );

      this._ctx.save();
      // Origin is at bottom left corner in OpenGL.
      this._ctx.translate( 0, this.HEIGHT );
      this._ctx.scale( 1, -1 );

      var entities = this.getEntities();
      for ( var i = 0, n = entities.length; i < n; i++ ) {
        entities[i].draw( this._ctx );
      }

      this._ctx.restore();
    };

    Game.prototype.getEntities = function() {
      return this._entities;
    };

    Game.prototype.addEntity = function( entity ) {
      this.getEntities().push( entity );
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
  }
);
