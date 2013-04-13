define(
  [ 'util' ],
  function( Util ) {

    function Color() {
      this._red = 0;
      this._green = 0;
      this._blue = 0;
      this._alpha = 0.0;

      if ( arguments.length !== 0 ) {
        this.set.apply( this, arguments );
      }
    }

    Color.prototype.set = function() {
      if ( arguments.length === 1 ) {
        this.setRed( arguments[0].getRed() );
        this.setGreen( arguments[0].getGreen() );
        this.setBlue( arguments[0].getBlue() );
        this.setAlpha( arguments[0].getAlpha() );
      } else if ( arguments.length === 4 ) {
        this.setRed( arguments[0] );
        this.setGreen( arguments[1] );
        this.setBlue( arguments[2] );
        this.setAlpha( arguments[3] );
      }
    };

    Color.prototype.getRed = function() {
      return this._red;
    };

    Color.prototype.setRed = function( red ) {
      this._red = red % 256;
      return this;
    };

    Color.prototype.getGreen = function() {
      return this._green;
    };

    Color.prototype.setGreen = function( green ) {
      this._green = green % 256;
      return this;
    };

    Color.prototype.getBlue = function() {
      return this._blue;
    };

    Color.prototype.setBlue = function( blue ) {
      this._blue = blue % 256;
      return this;
    };

    Color.prototype.getAlpha = function() {
      return Util.clamp( this._alpha, 0, 1 );
    };

    Color.prototype.setAlpha = function( alpha ) {
      this._alpha = alpha;
      return this;
    };

    Color.prototype.getBrightness = function() {
      // See Mark Ransom's answer on StackOverflow.
      // http://stackoverflow.com/questions/946544/good-text-foreground-color-for-a-given-background-color
      return 0.299 * this.getRed()   +
             0.587 * this.getGreen() +
             0.114 * this.getBlue();
    };

    Color.prototype.toString = function() {
      return 'rgba( ' + Math.round( this.getRed()   ) +
             ', '     + Math.round( this.getGreen() ) +
             ', '     + Math.round( this.getBlue()  ) +
             ', '     + this.getAlpha() + ' )';
    };

    Color.prototype.toHexString = function() {
      return "#" + ( ( 1 << 24 ) + this.toHex() ).toString( 16 ).slice(1);
    };

    Color.prototype.toHex = function() {
      return ( Math.round( this.getRed()   ) << 16 ) +
             ( Math.round( this.getGreen() ) << 8 ) +
               Math.round( this.getBlue()  );
    };

    Color.prototype.clone = function( color ) {
      return new Color().set( color );
    };

    Color.prototype.equals = function( color ) {
      return color.getRed()   === this.getRed()   &&
             color.getGreen() === this.getGreen() &&
             color.getBlue()  === this.getBlue()  &&
             color.getAlpha() === this.getAlpha();
    };

    Color.prototype.fromJSON = function( json ) {
      var jsonObject = JSON.parse( json );
      return this.setRed(   jsonObject.r || 0 )
                 .setGreen( jsonObject.g || 0 )
                 .setBlue(  jsonObject.b || 0 )
                 .setAlpha( jsonObject.a || 1.0 );
    };

    Color.prototype.toJSON = function() {
      var object = {};

      object.r = this.getRed();
      object.g = this.getGreen();
      object.b = this.getBlue();
      object.a = this.getAlpha();

      return object;
    };

    return Color;
  }
);
