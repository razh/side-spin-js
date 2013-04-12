// From libgdx.
define(
  [ './delegate-action.js' ],
  function( DelegateAction ) {

    function DelayAction() {
      DelegateAction.call( this );

      this._duration = 0.0;
      this._time = 0.0;
    }

    DelayAction.prototype = new DelayAction();
    DelayAction.prototype.constructor = DelayAction;

    DelayAction.prototype.act = function( delta ) {
      if ( this._time < this._duration ) {
        this._time += delta;
        if ( this._time < this._duration ) {
          return false;
        }

        delta = this._time - this._duration;
      }

      if ( this.getAction() !== null ) {
        return true;
      }

      return Action.prototype.act.call( delta );
    };

    DelayAction.prototype.finish = function() {
      this._time = this._duration;
    };

    DelayAction.prototype.restart = function() {
      Action.prototype.restart.call( this );
      this._time = 0;
    };

    // Duration;
    DelayAction.prototype.getDuration = function() {
      return this._duration;
    };

    DelayAction.prototype.setDuration = function( duration ) {
      this._duration = duration;
      return this;
    };

    // Time.
    DelayAction.prototype.getTime = function() {
      return this._time;
    };

    DelayAction.prototype.setTime = function( time ) {
      this._time = time;
      return this;
    };
  }
);
