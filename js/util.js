define(
  function() {
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

    var Util = {};

    Util.clamp = function( value, min, max ) {
      // Swap if the order is wrong.
      if ( max < min ) {
        var temp = min;
        min = max;
        max = temp;
      }

      if ( value < min ) {
        value = min;
      } else if ( value > max ) {
        value = max;
      }

      return value;
    };

    return Util;
  }
);
