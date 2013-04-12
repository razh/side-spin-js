define(
  [ '../util' ],
  function( Util ) {

    // From libgdx.
    function pow( power ) {
      return function( a ) {
        if ( a < 0.5 ) {
          return Math.pow( a * 2, power ) * 0.5;
        }

        return Math.pow( ( a - 1 ) * 2, power ) * ( power % 2 === 0 ? -0.5 : 0.5 ) + 1;
      };
    }

    function powIn( power ) {
      return function( a ) {
        return Math.pow( a, power );
      };
    }

    function powOut( power ) {
      return function( a ) {
        return Math.pow( a - 1, power ) * ( power % 2 === 0 ? -1 : 1 ) + 1;
      };
    }

    function expo( value, power ) {
      var min = Math.pow( value, -power ),
          scale = 1 / ( 1 - min );

      return function( a ) {
        if ( a < 0.5 ) {
          return ( Math.pow( value, power * ( a * 2 - 1 ) ) - min ) * scale * 0.5;
        }

        return ( 2 - ( Math.pow( value, -power * ( a * 2 - 1 ) ) - min ) * scale ) * 0.5;
      };
    }

    function expoIn( value, power ) {
      var min = Math.pow( value, -power ),
          scale = 1 / ( 1 - min );

      return function( a ) {
        return ( Math.pow( value, power * ( a - 1 ) ) - min ) * scale;
      };
    }

    function expoOut( value, power ) {
      var min = Math.pow( value, -power ),
          scale = 1 / ( 1 - min );

      return function( a ) {
        return 1 - ( Math.pow( value, -power * a ) - min ) * scale;
      };
    }

    // a is a value in the range [0, 1].
    return {
      linear: function( a ) {
        return a;
      },

      quad: pow(2),
      quadIn: powIn(2),
      quadOut: powOut(2),

      cubic: pow(3),
      cubicIn: powIn(3),
      cubicOut: powOut(3),

      quart: pow(4),
      quartIn: powIn(4),
      quartOut: powOut(4),

      quint: pow(5),
      quintIn: powIn(5),
      quintOut: powOut(5),

      sine: function( a ) {
        return 0.5 * ( 1 - Math.cos( a * Math.PI ) );
      },

      sineIn: function( a ) {
        return 1 - Math.cos( 0.5 * a * Math.PI );
      },

      sineOut: function( a ) {
        return Math.sin( 0.5 * a * Math.PI );
      },

      expo5: expo( 2, 5 ),
      expo5In: expoIn( 2, 5 ),
      expo5Out: expoOut( 2, 5 ),

      expo10: expo( 2, 10 ),
      expo10In: expoIn( 2, 10 ),
      expo10Out: expoOut( 2, 10 ),

      circle: function( a ) {
        if ( a <= 0.5 ) {
          a *= 2;
          return ( 1 - Math.sqrt( 1 - a * a ) ) * 0.5;
        }

        a--;
        a *= 2;
        return ( Math.sqrt( 1 - a * a ) + 1 ) * 0.5;
      },

      circleIn: function( a ) {
        return 1 - Math.sqrt( 1 - a * a );
      },

      circleOut: function( a ) {
        a--;
        return Math.sqrt( 1 - a * a );
      }
    };
  }
);
