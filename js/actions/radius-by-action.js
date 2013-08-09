define([
  'actions/relative-temporal-action'
], function( RelativeTemporalAction ) {
  'use strict';

  function RadiusByAction() {
    RelativeTemporalAction.call( this );

    this._amount = 0.0;
  }

  RadiusByAction.prototype = new RelativeTemporalAction();
  RadiusByAction.prototype.constructor = RadiusByAction;

  RadiusByAction.prototype.updateRelative = function( percentDelta ) {
    var object = this.getObject();
    object.setRadius( object.getRadius() + this._amount * percentDelta );
  };

  RadiusByAction.prototype.getAmount = function() {
    return this._amount;
  };

  RadiusByAction.prototype.setAmount = function( radiusAmount ) {
    this._amount = radiusAmount;
    return this;
  };

  RadiusByAction.prototype.clone = function() {
    return new RadiusByAction().set( this );
  };

  RadiusByAction.prototype.set = function( action ) {
    return RelativeTemporalAction.prototype.set.call( this, action )
      .setAmount( action.getAmount() );
  };

  RadiusByAction.prototype.equals = function( action ) {
    if ( action instanceof RadiusByAction ) {
      return RelativeTemporalAction.prototype.equals.call( this, action ) &&
             action.getAmount() === this.getAmount();
    }

    return false;
  };

  return RadiusByAction;
});
