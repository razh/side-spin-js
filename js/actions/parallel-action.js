// From libgdx.
define(
  [ './action' ],
  function( Action ) {

    function ParallelAction() {
      Action.call( this );

      this._actions = [];
      this._complete = false;
    }

    ParallelAction.prototype = new Action();
    ParallelAction.prototype.constructor = ParallelAction;

    ParallelAction.prototype.act = function( delta ) {
      if ( this._complete ) {
        return true;
      }

      this._complete = true;

      var actions = this.getActions();
      for ( var i = 0, n = actions.length; i < n; i++ ) {
        if ( !actions[i].act( delta ) ) {
          this._complete = false;
        }
      }

      return this._complete;
    };

    ParallelAction.prototype.restart = function() {
      this._complete = false;

      var actions = this.getActions();
      for ( var i = 0, n = actions.length; i < n; i++ ) {
        actions[i].restart();
      }
    };

    ParallelAction.prototype.reset = function() {
      Action.prototype.reset.call( this );
      this._actions = [];
    };

    ParallelAction.prototype.addAction = function( action ) {
      this._actions.push( action );

      var object = this.getObject();
      if ( object !== null ) {
        action.setObject( object );
      }
    };

    ParallelAction.prototype.setObject = function( object ) {
      var actions = this.getActions();
      for ( var i = 0, n = actions.length; i < n; i++ ) {
        actions[i].setObject( object );
      }

      Action.prototype.setObject.call( object );
    };

    ParallelAction.prototype.getActions = function() {
      return this._actions;
    };
  }
);
