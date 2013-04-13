// Analogous to RemoveActorAction in libgdx.
define(
  [ './action' ],
  function( Action ) {

    function RemoveAction() {
      Action.call( this );

      this._removeObject = null;
      this._removed = false;
    }

    RemoveAction.prototype = new Action();
    RemoveAction.prototype.constructor = RemoveAction;

    RemoveAction.prototype.act = function( delta ) {
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

    return RemoveAction;
  }
);
