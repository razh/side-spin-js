define(
  [ './relative-temporal-action' ],
  function( RelativeTemporalAction ) {

    function AngleByAction() {
      RelativeTemporalAction.call( this );

      this._amount = 0.0;
    }

    AngleByAction.prototype = new RelativeTemporalAction();
    AngleByAction.prototype.constructor = AngleByAction;

    AngleByAction.prototype.updateRelative = function( percentDelta ) {
      this.getObject().rotate( this._amount * percentDelta );
    };

    AngleByAction.prototype.getAmount = function() {
      return this._amount;
    };

    AngleByAction.prototype.setAmount = function( rotationAmount ) {
      this._amount = rotationAmount;
      return this;
    };

    return AngleByAction;
  }
);
