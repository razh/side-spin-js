// From libgdx.
define(
  [ './temporal-action',
    '../color' ],
  function( TemporalAction, Color ) {

    function ColorAction() {
      TemporalAction.call( this );

      this._startR = 0;
      this._startG = 0;
      this._startB = 0;
      this._startA = 0.0;

      this._color = null;
      this._endColor = new Color();
    }

    ColorAction.prototype = new TemporalAction();
    ColorAction.prototype.constructor = ColorAction;

    ColorAction.prototype.begin = function() {
      if ( this._color === null ) {
        this._color = this.getActor().getColor();
      }

      this._startR = this._color.getRed();
      this._startG = this._color.getGreen();
      this._startB = this._color.getBlue();
      this._startA = this._color.getAlpha();
    };

    ColorAction.prototype.update = function( percent ) {
      var endColor = this.getEndColor();

      var r = this._startR + ( endColor.getRed()   - this._startR ) * percent,
          g = this._startG + ( endColor.getGreen() - this._startG ) * percent,
          b = this._startB + ( endColor.getBlue()  - this._startB ) * percent,
          a = this._startA + ( endColor.getAlpha() - this._startA ) * percent;

      this._color.set( r, g, b, a );
    };

    return ColorAction;
  }
);
