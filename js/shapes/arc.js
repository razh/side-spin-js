define(
  [ '../color',
    '../object2d',
    '../math/interpolation',
    '../actions/actions' ],
  function( Color, Object2D, Interpolation, Actions ) {
    var color = Actions.color,
        forever = Actions.forever,
        lengthTo = Actions.lengthTo,
        sequence = Actions.sequence;

    function Arc() {
      Object2D.call( this );

      this._startAngle = 0.0;
      this._endAngle   = 0.0;

      this._length = 0.0;
    }

    Arc.prototype = new Object2D();
    Arc.prototype.constructor = Arc;

    Arc.prototype.draw = function( ctx ) {
      if ( !this.isVisible() ) {
        return;
      }

      var angle = this.getAngle(),
          // Middle of arc line.
          radius = 0.5 * this._length + this.getDistance();

      ctx.beginPath();
      ctx.arc( this.getX(),
               this.getY(),
               radius,
               this._startAngle + angle,
               this._endAngle + angle );

      ctx.strokeStyle = this.getColor().toString();
      ctx.lineWidth = Math.abs( this._length );
      ctx.stroke();
    };

    // Does not take into account x, y coordinates of parent.
    Arc.prototype.intersectsCircle = function( angle, distance, radius ) {
      if ( this._startAngle <= angle && angle <= this._endAngle ) {
        var arcDistance = this.getDistance(),
            arcLength = this.getLength();
        // Distance from circle to this.
        var difference = arcDistance - distance;
        // Check if both ends are intersecting the circle.
        if ( Math.abs( difference ) < radius ) {
          return true;
        }

        if ( Math.abs( difference + arcLength ) < radius ) {
          return true;
        }

        // Check if middle is intersecting.
        if ( arcDistance <= distance && distance <= arcDistance + arcLength ||
             arcDistance + arcLength <= distance && distance <= arcDistance ) {
          return true;
        }
      }

      return false;
    };

    Arc.prototype.getStartAngle = function() {
      return this._startAngle;
    };

    Arc.prototype.setStartAngle = function( startAngle ) {
      this._startAngle = startAngle;
      return this;
    };

    Arc.prototype.getEndAngle = function() {
      return this._endAngle;
    };

    Arc.prototype.setEndAngle = function( endAngle ) {
      this._endAngle = endAngle;
      return this;
    };

    Arc.prototype.getLength = function() {
      return this._length;
    };

    Arc.prototype.setLength = function( length ) {
      this._length = length;
      return this;
    };

    Arc.prototype.lengthen = function( length ) {
      return this.setLength( this.getLength() + length );
    };

    return Arc;
  }
);
