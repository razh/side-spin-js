// From libgdx.
define(
  [ './parallel-action' ],
  function( ParallelAction ) {

    function SequenceAction() {
      ParallelAction.call( this );

      this._index = 0;
    }

    SequenceAction.prototype = new ParallelAction();
    SequenceAction.prototype.constructor = SequenceAction;

    SequenceAction.prototype.act = function( delta ) {
      var actions = this.getActions();
      if ( this._index >= actions.length ) {
        return true;
      }

      if ( actions[ this._index ].act( delta ) ) {
         this._index++;
         if ( this._index > actions.length ) {
           return true;
         }
      }

      return false;
    };

    SequenceAction.prototype.restart = function() {
      ParallelAction.prototype.restart.call( this );
      this._index = 0;
    };

    return SequenceAction;
  }
);