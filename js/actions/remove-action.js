define([
  'actions/action'
], function( Action ) {
  'use strict';

  // Analogous to RemoveActorAction in libgdx.
  function RemoveAction() {
    Action.call( this );

    this._removeObject = null;
    this._removed = false;
  }

  RemoveAction.prototype = new Action();
  RemoveAction.prototype.constructor = RemoveAction;

  RemoveAction.prototype.act = function() {
    if ( !this._removed ) {
      this._removed = true;
      ( this._removeObject !== null ? this._removeObject : this.getObject() ).remove();
    }

    return true;
  };

  RemoveAction.prototype.restart = function() {
    this._removed = false;
  };

  RemoveAction.prototype.reset = function() {
    Action.prototype.reset.call( this );
    this._removeObject = null;
  };

  RemoveAction.prototype.getRemoveObject = function() {
    return this._removeObject;
  };

  RemoveAction.prototype.setRemoveObject = function( removeObject ) {
    this._removeObject = removeObject;
    return this;
  };

  RemoveAction.prototype.clone = function() {
    return new RemoveAction().set( this );
  };

  RemoveAction.prototype.set = function( action ) {
    return Action.prototype.set.call( this, action )
      .setRemoveObject( action.getRemoveObject() );
  };

  RemoveAction.prototype.equals = function( action ) {
    if ( action instanceof RemoveAction ) {
      return Action.prototype.equals.call( this, action ) &&
             action.getRemoveObject() === this.getRemoveObject();
    }

    return false;
  };

  return RemoveAction;
});
