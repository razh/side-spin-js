window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function( callback ) {
            window.setTimeout( callback, 1000 / 60 );
         };
}) ();

var _game;

function init() {
  _game = new Game();

  var world = new WorldBuilder().setArcColor( 65, 72, 76, 1.0 )
                                .create()
                                .setPosition( 0.5 * _game.WIDTH, 0.5 * _game.HEIGHT );
  world.setBackgroundColor( _game.getBackgroundColor() );
  _game.addEntity( world );

  _game.addEntity( new PlayerEntity().setPosition( 0.5 * _game.WIDTH, 0.5 * _game.HEIGHT )
                                     .setDistance( 192.0 ) );

  _game._canvas.addEventListener( 'mousedown', onMouseDown, null );
  document.addEventListener( 'keydown', onKeyDown, null );

  loop();
}

function loop() {
  if ( !_game.isRunning() ) {
    return;
  }

  _game.tick();
  requestAnimFrame( loop );
}

function quit() {
  _game.stop();
}

window.onload = init();
