// From libgdx.
define(function( require ) {
  var Action           = require( './action'             ),
      AlphaAction      = require( './alpha-action'       ),
      AngleByAction    = require( './angle-by-action'    ),
      AngleToAction    = require( './angle-to-action'    ),
      ColorAction      = require( './color-action'       ),
      DelayAction      = require( './delay-action'       ),
      DistanceByAction = require( './distance-by-action' ),
      DistanceToAction = require( './distance-to-action' ),
      MoveByAction     = require( './move-by-action'     ),
      MoveToAction     = require( './move-to-action'     ),
      ParallelAction   = require( './parallel-action'    ),
      RemoveAction     = require( './remove-action'      );
      RepeatAction     = require( './repeat-action'      );
      SequenceAction   = require( './sequence-action'    ),
      VisibleAction    = require( './visible-action'     );

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

    distanceTo: function( distance, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new DistanceToAction()
        .setDistance( distance )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    distanceBy: function( distanceAmount, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new DistanceByAction()
        .setAmount( distanceAmount )
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

    show: function() {
      return visible( true );
    },

    hide: function() {
      return visible( false );
    },

    visible: function( visible ) {
      return new VisibleAction().setVisible( visible );
    },

    remove: function( removeObject ) {
      removeObject = removeObject || null;

      return new RemoveAction()
        .setRemoveObject( removeObject );
    },

    delay: function( duration, delayedAction ) {
      delayedAction = delayedAction || null;

      return new DelayAction()
        .setDuration( duration )
        .setAction( delayedAction );
    },

    sequence: function() {
      var sequenceAction = new SequenceAction();

      for ( var i = 0, n = arguments.length; i < n; i++ ) {
        sequenceAction.addAction( arguments[i] );
      }

      return sequenceAction;
    },

    parallel: function() {
      var parallelAction = new ParallelAction();

      for ( var i = 0, n = arguments.length; i < n; i++ ) {
        parallelAction.addAction( arguments[i] );
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
