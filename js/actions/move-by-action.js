// From libgdx.
define(
  [ './relative-temporal-action' ],
  function( RelativeTemporalAction ) {

    function MoveByAction() {
      RelativeTemporalAction.call( this );

      this._amountX = 0.0;
      this._amountY = 0.0;
    }

    MoveByAction.prototype = new RelativeTemporalAction();
    MoveByAction.prototype.constructor = MoveByAction;

    MoveByAction.prototype.updateRelative = function( percentDelta ) {
      this.getObject().translate( this._amountX * percentDelta,
                                  this._amountY * percentDelta );
    };

    MoveByAction.prototype.setAmount = function( x , y ) {
      this.setAmountX(x);
      this.setAmountY(y);
      return this;
    };

    MoveByAction.prototype.getAmountX = function() {
      return this._amountX;
    };

    MoveByAction.prototype.setAmountX = function( x ) {
      this._amountX = x;
      return this;
    };

    MoveByAction.prototype.getAmountY = function() {
      return this._amountY;
    };

    MoveByAction.prototype.setAmountY = function( y ) {
      this._amountY = y;
      return this;
    };

    MoveByAction.prototype.clone = function() {
      return new MoveByAction().set( this );
    };

    MoveByAction.prototype.set = function( action ) {
      return RelativeTemporalAction.prototype.set.call( this, action )
        .setAmountX( action.getAmountX() )
        .setAmountY( action.getAmountY() );
    };

    MoveByAction.prototype.equals = function( action ) {
      if ( action instanceof MoveByAction ) {
        return RelativeTemporalAction.prototype.equals.call( this, action ) &&
               action.getAmountX() === this.getAmountX() &&
               action.getAmountY() === this.getAmountY();
      }

      return false;
    };

    return MoveByAction;
  }
);
