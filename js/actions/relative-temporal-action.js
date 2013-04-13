// From libgdx.
define(
  [ './temporal-action' ],
  function( TemporalAction ) {
     // RelativeTemporalAction.
    function RelativeTemporalAction() {
      TemporalAction.call( this );

      this._lastPercent = 0.0;
    }

    RelativeTemporalAction.prototype = new TemporalAction();
    RelativeTemporalAction.prototype.constructor = RelativeTemporalAction;

    RelativeTemporalAction.prototype.begin = function() {
      this._lastPercent = 0;
    };

    RelativeTemporalAction.prototype.update = function( percent ) {
      this.updateRelative( percent - this._lastPercent );
      this._lastPercent = percent;
    };

    RelativeTemporalAction.prototype.updateRelative = function( percentDelta ) {};

    RelativeTemporalAction.prototype.clone = function() {
      return new RelativeTemporalAction().set( this );
    };

    RelativeTemporalAction.prototype.equals = function( action ) {
      if ( action instanceof RelativeTemporalAction ) {
        return TemporalAction.prototype.equals.call( this, action );
      }

      return false;
    };

    return RelativeTemporalAction;
  }
);
