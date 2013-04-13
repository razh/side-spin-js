define(
  [ './relative-temporal-action' ],
  function( RelativeTemporalAction ) {

    function DistanceByAction() {
      RelativeTemporalAction.call( this );

      this._amount = 0.0;
    }

    DistanceByAction.prototype = new RelativeTemporalAction();
    DistanceByAction.prototype.constructor = DistanceByAction;

    DistanceByAction.prototype.updateRelative = function( percentDelta ) {
      this.getObject().radialTranslate( this._amount * percentDelta );
    };

    DistanceByAction.prototype.getAmount = function() {
      return this._amount;
    };

    DistanceByAction.prototype.setAmount = function( distanceAmount ) {
      this._amount = distanceAmount;
      return this;
    };

    DistanceByAction.prototype.clone = function() {
      return new DistanceByAction().set( this );
    };

    DistanceByAction.prototype.set = function( action ) {
      return RelativeTemporalAction.prototype.set.call( this, action )
        .setAmount( action.getAmount() );
    };

    DistanceByAction.prototype.equals = function( action ) {
      if ( action instanceof DistanceByAction ) {
        return RelativeTemporalAction.prototype.equals.call( this, action ) &&
               action.getAmount() === this.getAmount();
      }

      return false;
    };

    return DistanceByAction;
  }
);
