// From libgdx.
define(function( require ) {
  var Action         = require( './action'          ),
      AlphaAction    = require( './alpha-action'    ),
      AngleByAction  = require( './angle-by-action' ),
      AngleToAction  = require( './angle-to-action' ),
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

      return new MoveToAction()
        .setPosition( x, y )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    moveBy: function( amountX, amountY, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new MoveByAction()
        .setAmount( amountX, amountY )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    angleTo: function( rotation, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new AngleToAction()
        .setRotation( rotation )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    angleBy: function( rotationAmount, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new AngleByAction()
        .setAmount( rotationAmount )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    color: function( color, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new ColorAction()
        .setEndColor( color )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    alpha: function( alpha, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new AlphaAction()
        .setAlpha( alpha )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    fadeOut: function( duration, interpolation ) {
      return alpha( 0, duration, interpolation );
    },

    fadeIn: function( duration, interpolation ) {
      return alpha( 1, duration, interpolation );
    },

    parallel: function() {
      var parallelAction = new ParallelAction();

      for ( var i = 0, n = arguments.length; i < n; i++ ) {
        parallelAction.addAction( arguments[0] );
      }

      return parallelAction;
    },

    repeat: function( count, repeatedAction ) {
      return new RepeatAction()
        .setCount( count )
        .setAction( repeatedAction );
    },

    forever: function( repeatedAction ) {
      return new RepeatAction()
        .setCount( RepeatAction.FOREVER )
        .setAction( repeatedAction );
    }
  };
});
