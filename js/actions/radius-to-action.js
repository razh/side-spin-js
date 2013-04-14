define(
  [ './temporal-action' ],
  function( TemporalAction ) {

    function RadiusToAction() {
      TemporalAction.call( this );

      this._start = 0.0;
      this._end = 0.0;
    }

    RadiusToAction.prototype = new TemporalAction();
    RadiusToAction.prototype.constructor = RadiusToAction;

    RadiusToAction.prototype.begin = function() {
      this._start = this.getObject().getRadius();
    };

    RadiusToAction.prototype.update = function( percent ) {
      this.getObject().setRadius( this._start + ( this._end - this._start ) * percent );
    };

    RadiusToAction.prototype.getRadius = function() {
      return this._end;
    };

    RadiusToAction.prototype.setRadius = function( radius ) {
      this._end = radius;
      return this;
    };

    RadiusToAction.prototype.clone = function() {
      return new RadiusToAction().set( this );
    };

    RadiusToAction.prototype.set = function( action ) {
      return TemporalAction.prototype.set.call( this, action )
        .setRadius( action.getRadius() );
    };

    RadiusToAction.prototype.equals = function( action ) {
      if ( action instanceof RadiusToAction ) {
        return TemporalAction.prototype.equals.call( this, action ) &&
               action.getRadius() === this.getRadius();
      }

      return false;
    };

    return RadiusToAction;
  }
);
