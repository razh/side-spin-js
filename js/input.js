define(
  [ 'game' ],
  function( Game ) {
    function onMouseDown( event ) {
      var input = transformCoords( event.pageX, event.pageY );

      if ( input.x < 0.5 * Game.instance.WIDTH ) {
        console.log( 'left' );
      } else {
        console.log( 'right' );
      }
    }

    function onKeyDown( event ) {
      Game.instance.input.keys[ event.which ] = true;

      switch( event.which ) {
        // q.
        case 81:
          Game.instance.stop();
          break;
      }
    }

    function onKeyUp( event ) {
      Game.instance.input.keys[ event.which ] = false;
    }

    function transformCoords( x, y ) {
      return {
        x: x - Game.instance._canvas.offsetLeft,
        y: Game.instance.HEIGHT - ( y - Game.instance._canvas.offsetTop )
      };
    }

    return {
      onMouseDown: onMouseDown,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp,
      transformCoords: transformCoords
    };
  }
);
