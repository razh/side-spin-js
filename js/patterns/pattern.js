define(
  [ '../math/interpolation' ],
  function( Interpolation ) {

    /**
      A pattern consists of a series of ordered keyframes (in a binary tree?).
      Note that it shares many similarities with libgdx's 2D Animation class.

      Each keyframe has:
        - spacing
        - distance
        - start time
        - interpolation

      A pattern should be able to loop.
      A pattern should be able go in reverse.

      Example usage:

        var pattern = new Pattern();
        pattern.addKeyFrame( new KeyFrame( 50, 100, 1000, Interpolation.quad ) );

        pattern.setPlayMode();
     */
    function Pattern() {
      this._time = 0.0;
      this._playMode = Pattern.PlayMode.NORMAL;
    }

    Pattern.PlayMode = {
      NORMAL:        0,
      REVERSED:      1,
      LOOP:          2,
      LOOP_REVERSED: 3
    };

    Pattern.prototype.addKeyFrame = function() {
      return this;
    };

    Pattern.prototype.act = function( delta ) {
      switch ( this._playMode ) {
        case Pattern.PlayMode.NORMAL:
          break;

        case Pattern.PlayMode.REVERSED:
          break;

        case Pattern.PlayMode.LOOP:
          break;

        case Pattern.PlayMode.LOOP_REVERSED:
          break;
      }
    };

    Pattern.prototype.setPlayMode = function( playMode ) {
      this._playMode = playMode;
      return this;
    };

    return Pattern;
  }
);
