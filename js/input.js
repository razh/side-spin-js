function onMouseDown( event ) {}

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
