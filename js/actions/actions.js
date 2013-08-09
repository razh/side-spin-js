define(function( require ) {
  // From libgdx.
  'use strict';

  var Action           = require( 'actions/action'             ),
      AlphaAction      = require( 'actions/alpha-action'       ),
      AngleByAction    = require( 'actions/angle-by-action'    ),
      AngleToAction    = require( 'actions/angle-to-action'    ),
      ColorAction      = require( 'actions/color-action'       ),
      DelayAction      = require( 'actions/delay-action'       ),
      DistanceByAction = require( 'actions/distance-by-action' ),
      DistanceToAction = require( 'actions/distance-to-action' ),
      LengthByAction   = require( 'actions/length-by-action'   ),
      LengthToAction   = require( 'actions/length-to-action'   ),
      MoveByAction     = require( 'actions/move-by-action'     ),
      MoveToAction     = require( 'actions/move-to-action'     ),
      ParallelAction   = require( 'actions/parallel-action'    ),
      RadiusByAction   = require( 'actions/radius-by-action'   ),
      RadiusToAction   = require( 'actions/radius-to-action'   ),
      RemoveAction     = require( 'actions/remove-action'      ),
      RepeatAction     = require( 'actions/repeat-action'      ),
      SequenceAction   = require( 'actions/sequence-action'    ),
      VisibleAction    = require( 'actions/visible-action'     );

  function alpha( newAlpha, duration, interpolation ) {
    duration = duration || 0;
    interpolation = interpolation || null;

    return new AlphaAction()
      .setAlpha( newAlpha )
      .setDuration( duration )
      .setInterpolation( interpolation );
  }

  function visible( visibility ) {
    return new VisibleAction().setVisible( visibility );
  }

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

    lengthBy: function( lengthAmount, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new LengthByAction()
        .setAmount( lengthAmount )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    lengthTo: function( length, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new LengthToAction()
        .setLength( length )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    radiusBy: function( radiusAmount, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new RadiusByAction()
        .setAmount( radiusAmount )
        .setDuration( duration )
        .setInterpolation( interpolation );
    },

    radiusTo: function( radius, duration, interpolation ) {
      duration = duration || 0;
      interpolation = interpolation || null;

      return new RadiusToAction()
        .setRadius( radius )
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

    alpha: alpha,

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

    visible: visible,

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
