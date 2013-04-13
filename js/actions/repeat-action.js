// From libgdx.
define(
  [ './delegate-action' ],
  function( DelegateAction ) {

    function RepeatAction() {
      DelegateAction.call( this );

      this._repeatCount = 0;
      this._executedCount = 0;

      this._finished = false;
    }

    RepeatAction.FOREVER = -1;

    RepeatAction.prototype = new DelegateAction();
    RepeatAction.prototype.constructor = RepeatAction;

    RepeatAction.prototype.act = function( delta ) {
      if ( this._executedCount === this._repeatCount ) {
        return true;
      }

      var action = this.getAction();
      if ( action.act( delta ) ) {
        if ( this._finished ) {
          return true;
        }

        if ( this._repeatCount > 0 ) {
          this._executedCount++;
        }

        if ( this._executedCount === this._repeatCount ) {
          return true;
        }

        if ( action !== null ) {
          action.restart();
        }
      }

      return false;
    };

    RepeatAction.prototype.finish = function() {
      this._finished = true;
    };

    RepeatAction.prototype.restart = function() {
      DelegateAction.prototype.restart.call( this );

      this._executedCount = 0;
      this._finished = false;
    };

    RepeatAction.prototype.getCount = function() {
      return this._repeatCount;
    };

    RepeatAction.prototype.setCount = function( count ) {
      this._repeatCount = count;
    };

    RepeatAction.prototype.clone = function() {
      return new RepeatAction().set( this );
    };

    RepeatAction.prototype.set = function( action ) {
      return DelegateAction.prototype.set.call( this, action )
        .setCount( action.getCount() );
    };

    RepeatAction.prototype.equals = function( action ) {
      if ( action instanceof RepeatAction ) {
        return DelegateAction.prototype.equals.call( this, action ) &&
               action.getCount() === this.getCount();
      }

      return false;
    };

    return RepeatAction;
  }
);
