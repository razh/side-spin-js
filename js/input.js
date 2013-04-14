define(
  [ 'game' ],
  function( Game ) {
    return {
      onMouseDown: function( event ) {
        var input = transformCoords( event.pageX, event.pageY );

        if ( input.x < 0.5 * Game.instance.WIDTH ) {
          console.log( 'left' );
        } else {
          console.log( 'right' );
        }
      },

      onKeyDown: function( event ) {
        Game.instance.input.keys[ event.which ] = true;

        switch( event.which ) {
          // q.
          case 81:
            Game.instance.stop();
            break;
        }
      },

      onKeyUp: function( event ) {
        Game.instance.input.keys[ event.which ] = false;
      },

      onTouchStart: function( event ) {},

      onTouchMove: function( event ) {},

      onTouchEnd: function( event ) {},

      onTouchCancel: function( event ) {},

      transformCoords: function( x, y ) {
        return {
          x: x - Game.instance._canvas.offsetLeft,
          y: Game.instance.HEIGHT - ( y - Game.instance._canvas.offsetTop )
        };
      }
    };
  }
);
