// From libgdx.
define(function( require ) {
  var Action         = require( './action'          ),
      ColorAction    = require( './color-action'    ),
      DelayAction    = require( './delay-action'    ),
      MoveByAction   = require( './move-by-action'  ),
      MoveToAction   = require( './move-to-action'  ),
      ParallelAction = require( './parallel-action' ),
      RepeatAction   = require( './repeat-action'   );
      SequenceAction = require( './sequence-action' );

  return {
    moveTo: function( x, y, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new MoveToAction().setPosition( x, y )
                               .setDuration( duration )
                               .setInterpolation( interpolation );
    },

    moveBy: function( amountX, amountY, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new MoveByAction().setAmount( amountX, amountY )
                               .setDuration( duration )
                               .setInterpolation( interpolation );
    },

    parallel: function() {
      var parallelAction = new ParallelAction();

      for ( var i = 0, n = arguments.length; i < n; i++ ) {
        parallelAction.addAction( arguments[0] );
      }

      return parallelAction;
    },

    repeat: function( count, repeatedAction ) {
      return new RepeatAction().setCount( count )
                               .setAction( repeatedAction );
    },

    forever: function( repeatedAction ) {
      return new RepeatAction().setCount( RepeatAction.FOREVER )
                               .setAction( repeatedAction );
    }
  };
});
