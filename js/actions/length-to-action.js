define(
  [ './temporal-action' ],
  function( TemporalAction ) {

    function LengthToAction() {
      TemporalAction.call( this );

      this._start = 0.0;
      this._end = 0.0;
    }

    LengthToAction.prototype = new TemporalAction();
    LengthToAction.prototype.constructor = LengthToAction;

    LengthToAction.prototype.begin = function() {
      this._start = this.getObject().getLength();
    };

    LengthToAction.prototype.update = function( percent ) {
      this.getObject().setLength( this._start + ( this._end - this._start ) * percent );
    };

    LengthToAction.prototype.getLength = function() {
      return this._end;
    };

    LengthToAction.prototype.setLength = function( length ) {
      this._end = length;
      return this;
    };

    LengthToAction.prototype.clone = function() {
      return new LengthToAction().set( this );
    };

    LengthToAction.prototype.set = function( action ) {
      return TemporalAction.prototype.set.call( this, action )
        .setLength( action.getLength() );
    };

    LengthToAction.prototype.equals = function( action ) {
      if ( action instanceof LengthToAction ) {
        return TemporalAction.prototype.equals.call( this, action ) &&
               action.getLength() === this.getLength();
      }

      return false;
    };

    return LengthToAction;
  }
);
