// From libgdx.
define(
  [ './action' ],
  function( Action ) {
    // TemporalAction
    // --------------
    function TemporalAction() {
      Action.call( this );

      this._duration = 0.0;
      // Transition time so far.
      this._time = 0.0;

      this._interpolation = null;

      this._reverse = false;
      this._complete = false;
    }

    TemporalAction.prototype = new Action();
    TemporalAction.prototype.constructor = TemporalAction;

    TemporalAction.prototype.act = function( delta ) {
      if ( this._complete ) {
        return true;
      }

      if ( this._time === 0 ) {
        this.begin();
      }

      this._time += delta;
      this._complete = this._time >= this._duration;

      var percent;

      if ( this._complete ) {
        percent = 1;
      } else {
        percent = this._time / this._duration;
        if ( this._interpolation !== null ) {
          percent = this._interpolation.call( this, percent );
        }
      }

      this.update( this._reverse ? 1 - percent : percent );
      if ( this._complete ) {
        this.end();
      }

      return this._complete;
    };

    // Code to be executed before the beginning of transition.
    TemporalAction.prototype.begin = function() {};

    TemporalAction.prototype.end = function() {};

    // Called every frame,
    TemporalAction.prototype.update = function( percent ) {};

    TemporalAction.prototype.finish = function() {
      this._time = this._duration;
    };

    TemporalAction.prototype.restart = function() {
      this._time = 0;
      this._complete = false;
    };

    TemporalAction.prototype.reset = function() {
      Action.prototype.reset.call( this );
      this._reverse = false;
      this._interpolation = null;
    };

    // Duration.
    TemporalAction.prototype.getDuration = function() {
      return this._duration;
    };

    TemporalAction.prototype.setDuration = function( duration ) {
      this._duration = duration;
      return this;
    };

    // Time.
    TemporalAction.prototype.getTime = function() {
      return this._time;
    };

    TemporalAction.prototype.setTime = function( time ) {
      this._time = time;
      return this;
    };

    // Interpolation.
    TemporalAction.prototype.getInterpolation = function() {
      return this._interpolation;
    };

    TemporalAction.prototype.setInterpolation = function( interpolation ) {
      this._interpolation = interpolation;
      return this;
    };

    // Reverse.
    TemporalAction.prototype.isReverse = function() {
      return this._reverse;
    };

    TemporalAction.prototype.setReverse = function( reverse ) {
      this._reverse = reverse;
      return this;
    };

    return TemporalAction;
  }
);
