define([
  'actions/temporal-action'
], function( TemporalAction ) {
  'use strict';

  // From libgdx.
  function MoveToAction() {
    TemporalAction.call( this );

    this._startX = 0.0;
    this._startY = 0.0;
    this._endX = 0.0;
    this._endY = 0.0;
  }

  MoveToAction.prototype = new TemporalAction();
  MoveToAction.prototype.constructor = MoveToAction;

  MoveToAction.prototype.begin = function() {
    var object = this.getObject();
    this._startX = object.getX();
    this._startY = object.getY();
  };

  MoveToAction.prototype.update = function( percent ) {
    this.getObject().setPosition( this._startX + ( this._endX - this._startX ) * percent,
                                  this._startY + ( this._endY - this._startY ) * percent );
  };

  MoveToAction.prototype.setPosition = function( x, y ) {
    this.setX(x);
    this.setY(y);
    return this;
  };

  MoveToAction.prototype.getX = function() {
    return this._endX;
  };

  MoveToAction.prototype.setX = function( x ) {
    this._endX = x;
    return this;
  };

  MoveToAction.prototype.getY = function() {
    return this._endY;
  };

  MoveToAction.prototype.setY = function( y ) {
    this._endY = y;
    return this;
  };

  MoveToAction.prototype.clone = function() {
    return new MoveToAction().set( this );
  };

  MoveToAction.prototype.set = function( action ) {
    return TemporalAction.prototype.set.call( this, action )
      .setX( action.getX() )
      .setY( action.getY() );
  };

  MoveToAction.prototype.equals = function( action ) {
    if ( action instanceof MoveToAction ) {
      return TemporalAction.prototype.equals.call( this, action ) &&
             action.getX() === this.getY() &&
             action.getY() === this.getY();
    }

    return false;
  };

  return MoveToAction;
});
