define(
  [ './relative-temporal-action' ],
  function( RelativeTemporalAction ) {

    function LengthByAction() {
      RelativeTemporalAction.call( this );

      this._amount = 0.0;
    }

    LengthByAction.prototype = new RelativeTemporalAction();
    LengthByAction.prototype.constructor = LengthByAction;

    LengthByAction.prototype.updateRelative = function( percentDelta ) {
      this.getObject().lengthen( this.getObject().getLength() + this._amount * percentDelta );
    };

    LengthByAction.prototype.getAmount = function() {
      return this._amount;
    };

    LengthByAction.prototype.setAmount = function( lengthAmount ) {
      this._amount = lengthAmount;
      return this;
    };

    LengthByAction.prototype.clone = function() {
      return new LengthByAction().set( this );
    };

    LengthByAction.prototype.set = function( action ) {
      return RelativeTemporalAction.prototype.set.call( this, action )
        .setAmount( action.getAmount() );
    };

    LengthByAction.prototype.equals = function( action ) {
      if ( action instanceof LengthByAction ) {
        return RelativeTemporalAction.prototype.equals.call( this, action ) &&
               action.getAmount() === this.getAmount();
      }

      return false;
    };

    return LengthByAction;
  }
);
