function onMouseDown( event ) {
  var input = transformCoords( event.pageX, event.pageY );

  if ( input.x < 0.5 * _game.WIDTH ) {
    console.log( 'left' );
  } else {
    console.log( 'right' );
  }
}

function onKeyDown( event ) {
  switch( event.which ) {
    // q.
    case 81:
      quit();
      break;
  }
}

function transformCoords( x, y ) {
  return {
    x: x - _game._canvas.offsetLeft,
    y: _game.HEIGHT - ( y - _game._canvas.offsetTop )
  };
}
