define(
  [ '../object2d' ],
  function( Object2D ) {
    var PI2 = 2 * Math.PI;

    function Circle() {
      Object2D.call( this );

      this._radius = 0.0;
    }

    Circle.prototype = new Object2D();
    Circle.prototype.constructor = Circle;

    Circle.prototype.draw = function( ctx ) {
      if ( !this.isVisible ) {
        return;
      }

      ctx.beginPath();
      ctx.arc( this.getX(), this.getY(), this.getRadius(), 0, PI2 );

      ctx.fillStyle = this.getColor().toString();
      ctx.fill();
    };

    Circle.prototype.getRadius = function() {
      return this._radius;
    };

    Circle.prototype.setRadius = function( radius ) {
      this._radius = radius;
      return this;
    };

    return Circle;
  }
);
