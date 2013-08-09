define([
  'actions/relative-temporal-action'
], function( RelativeTemporalAction ) {
  'use strict';

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

  AngleByAction.prototype.clone = function() {
    return new AngleByAction().set( this );
  };

  AngleByAction.prototype.set = function( action ) {
    return RelativeTemporalAction.prototype.set.call( this, action )
      .setAmount( action.getAmount() );
  };

  AngleByAction.prototype.equals = function( action ) {
    if ( action instanceof AngleByAction ) {
      return RelativeTemporalAction.prototype.equals.call( this, action ) &&
             action.getAmount() === this.getAmount();
    }

    return false;
  };

  return AngleByAction;
});
