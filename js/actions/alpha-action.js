// From libgdx.
define(
  [ './temporal-action' ],
  function( TemporalAction ) {

    function AlphaAction() {
      TemporalAction.call( this );

      this._start = 0.0;
      this._end = 0.0;

      this._color = null;
    }

    AlphaAction.prototype = new TemporalAction();
    AlphaAction.prototype.constructor = AlphaAction;

    AlphaAction.prototype.begin = function() {
      if ( this._color === null ) {
        this._color = this.getObject().getColor();
      }

      this._start = this._color.getAlpha();
    };

    AlphaAction.prototype.update = function( percent ) {
      this._color.setAlpha( this._start + ( this._end - this._start ) * percent );
    };

    AlphaAction.prototype.reset = function() {
      TemporalAction.prototype.reset.call( this );
      this._color = null;
    };

    AlphaAction.prototype.getColor = function() {
      return this._color;
    };

    AlphaAction.prototype.setColor = function( color ) {
      this._color = color;
      return this;
    };

    AlphaAction.prototype.getAlpha = function() {
      return this._end;
    };

    AlphaAction.prototype.setAlpha = function( alpha ) {
      this._end = alpha;
      return this;
    };

    return AlphaAction;
  }
);
