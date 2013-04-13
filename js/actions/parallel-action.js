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

      Action.prototype.setObject.call( this, object );
    };

    ParallelAction.prototype.getActions = function() {
      return this._actions;
    };

    ParallelAction.prototype.clone = function() {
      return new ParallelAction().set( this );
    };

    ParallelAction.prototype.set = function( action ) {
      Action.prototype.set.call( this, action );

      var actions = action.getActions();
      for ( var i = 0, n = actions.length; i < n; i++ ) {
        this.addAction( actions[i].clone() );
      }

      return this;
    };

    ParallelAction.prototype.equals = function( action ) {
      if ( !( action instanceof ParallelAction ) ) {
        return false;
      }

      var actions = this.getActions(),
          otherActions = actions.getActions();

      if ( actions.length !== otherActions.length ) {
        return false;
      }

      for ( var i = 0, n = actions.length; i < n; i++ ) {
        if ( !actions[i].equals( otherActions[i] ) ) {
          return false;
        }
      }

      return Action.prototype.equals.call( this, action );
    };

    return ParallelAction;
  }
);
