define([
  'actions/action'
], function( Action ) {
  'use strict';

  function VisibleAction() {
    Action.call( this );

    this._visible = false;
  }

  VisibleAction.prototype = new Action();
  VisibleAction.prototype.constructor = VisibleAction;

  VisibleAction.prototype.act = function( delta ) {
    this.getObject().setVisible( this._visible );
  };

  VisibleAction.prototype.isVisible = function() {
    return this._visible;
  };

  VisibleAction.prototype.setVisible = function( visible ) {
    this._visible = visible;
    return this;
  };

  VisibleAction.prototype.clone = function() {
    return new VisibleAction().set( this );
  };

  VisibleAction.prototype.set = function( action ) {
    return Action.prototype.set.call( this, action )
      .setVisible( this.isVisible );
  };

  VisibleAction.prototype.equals = function( action ) {
    if ( action instanceof VisibleAction ) {
      return Action.prototype.equals.call( this, action ) &&
             action.isVisible() === this.isVisible();
    }

    return false;
  };

  return VisibleAction;
});
