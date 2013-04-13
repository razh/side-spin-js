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
      console.log( event.which )
      switch( event.which ) {
        // q.
        case 81:
          Game.instance.stop();
          break;
      }
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
      transformCoords: transformCoords
    };
  }
);
