// From libgdx.
define(
  [ './action' ],
  function( Action ) {

    function DelegateAction() {
      Action.call( this );

      this._action = null;
    }

    DelegateAction.prototype.getAction = function() {
      return this._action;
    };

    DelegateAction.prototype.setAction = function( action ) {
      this._action = action;
      return this;
    };

    DelegateAction.prototype.restart = function() {
      if ( this._action !== null ) {
        this._action.restart();
      }
    };

    DelegateAction.prototype.reset = function() {
      Action.prototype.reset.call( this );
      this.setAction( null );
    };

    DelegateAction.prototype.setObject = function( object ) {
      if ( this._action !== null ) {
        this._action.setObject( object );
      }

      return Action.prototype.setObject.call( this, object );
    };
  }
);
