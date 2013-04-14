require(
  [ 'game',
    'util', // For requestAnimFrame.
    'input',
    'world/world-builder',
    'entities/entity',
    'entities/player-entity',
    'math/interpolation' ],
  function( Game, Util, Input, WorldBuilder, Entity, PlayerEntity, Interpolation ) {
    var _game;

    function init() {
      _game = new Game();
      Game.instance = _game;

      var world = new WorldBuilder()
        .setArcColor( 65, 72, 76, 1.0 )
        .create()
        // .setPosition( 0.5 * _game.WIDTH, 0.5 * _game.HEIGHT );
        .setPosition( 0.25 * _game.WIDTH, 0.25 * _game.HEIGHT );

      world.setBackgroundColor( _game.getBackgroundColor() );
      _game.addObject( world );

      _game._player = new PlayerEntity()
        .setPosition( 0.25 * _game.WIDTH, 0.25 * _game.HEIGHT )
        .setDistance( 192.0 )
        .setWorld( world );
      _game.addObject( _game._player );

      if ( 'ontouchstart' in window ) {
        document.addEventListener( 'touchstart', Input.onTouchStart, null );
        document.addEventListener( 'touchmove', Input.onTouchMove, null );
        document.addEventListener( 'touchend', Input.onTouchEnd, null );
        document.addEventListener( 'touchcancel', Input.onTouchCancel, null );
      } else {
        document.addEventListener( 'mousedown', Input.onMouseDown, null );
        document.addEventListener( 'mouseup', Input.onMouseUp, null );
      }


      document.addEventListener( 'keydown', Input.onKeyDown, null );
      document.addEventListener( 'keyup', Input.onKeyUp, null );

      loop();
    }

    function loop() {
      if ( !_game.isRunning() ) {
        return;
      }

      _game.tick();
      requestAnimFrame( loop );
    }

    init();
  }
);

require.config({
    urlArgs: "bust=" + ( new Date() ).getTime()
});
