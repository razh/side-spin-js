define([
  'game'
], function( Game ) {
  'use strict';

  function transformCoords( x, y ) {
    return {
      x: x - Game.instance._canvas.offsetLeft,
      y: Game.instance.HEIGHT - ( y - Game.instance._canvas.offsetTop )
    };
  }

  return {
    onMouseDown: function( event ) {
      var input = transformCoords( event.pageX, event.pageY );

      if ( input.x < 0.5 * Game.instance.WIDTH ) {
        Game.instance.input.keys[ 37 ] = true;
        console.log( 'left' );
      } else {
        Game.instance.input.keys[ 39 ] = true;
        console.log( 'right' );
      }
    },

    onMouseUp: function( event ) {
      Game.instance.input.keys[ 37 ] = false;
      Game.instance.input.keys[ 39 ] = false;
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

    onTouchStart: function( event ) {
      event.preventDefault();
    },

    onTouchMove: function( event ) {
      event.preventDefault();
    },

    onTouchEnd: function( event ) {
      event.preventDefault();
    },

    onTouchCancel: function( event ) {
      event.preventDefault();
    },

    transformCoords: transformCoords
  };
});
