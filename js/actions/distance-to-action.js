define([
  'actions/temporal-action'
], function( TemporalAction ) {
  'use strict';

  function DistanceToAction() {
    TemporalAction.call( this );

    this._start = 0.0;
    this._end   = 0.0;
  }

  DistanceToAction.prototype = new TemporalAction();
  DistanceToAction.prototype.constructor = DistanceToAction;

  DistanceToAction.prototype.begin = function() {
    this._start = this.getObject().getDistance();
  };

  DistanceToAction.prototype.update = function( percent ) {
    this.getObject().setDistance( this._start + ( this._end - this._start ) * percent );
  };

  DistanceToAction.prototype.getDistance = function() {
    return this._end;
  };

  DistanceToAction.prototype.setDistance = function( distance ) {
    this._end = distance;
    return this;
  };

  DistanceToAction.prototype.clone = function() {
    return new DistanceToAction().set( this );
  };

  DistanceToAction.prototype.set = function( action ) {
    return TemporalAction.prototype.set.call( this, action )
      .setDistance( action.getDistance() );
  };

  DistanceToAction.prototype.equals = function( action ) {
    if ( action instanceof DistanceToAction ) {
      return TemporalAction.prototype.equals.call( this, action ) &&
             action.getDistance() === this.getDistance();
    }

    return false;
  };

  return DistanceToAction;
});
