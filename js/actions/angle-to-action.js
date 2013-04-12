// From libgdx.
define(
  [ './temporal-action' ],
  function( TemporalAction ) {

    function AngleToAction() {
      TemporalAction.call( this );

      this._start = 0.0;
      this._end = 0.0;
    }

    AngleToAction.prototype = new TemporalAction();
    AngleToAction.prototype.constructor = AngleToAction;

    AngleToAction.prototype.begin = function() {
      this._start = this.getObject().getAngle();
    };

    AngleToAction.prototype.update = function( percent ) {
      this.getObject().setAngle( this._start + ( this._end - this._start ) * percent );
    };

    AngleToAction.prototype.getAngle = function() {
      return this._end;
    };

    AngleToAction.prototype.setAngle = function( angle ) {
      this._end = angle;
      return this;
    };

    return AngleToAction;
  }
);
