define(
  [ 'color' ],
  function( Color ) {
    function Object2D() {
      this._position = {
        x: 0.0,
        y: 0.0
      };

      this._angle    = 0.0;
      this._distance = 0.0;

      this._color = new Color( 255, 255, 255, 1.0 );

      this._visible   = true;
      this._colliding = true;

      this._actions = [];
    }

    Object2D.prototype.act = function( delta ) {
      var actions = this.getActions();
      var action;
      for ( var i = 0, n = actions.length; i < n; i++ ) {
        action = actions[i];
        if ( action.act( delta ) ) {
          actions.splice( i, 1 );
          action.setObject( null );
          i--;
          n--;
        }
      }
    };

    // Actions.
    Object2D.prototype.addAction = function( action ) {
      action.setObject( this );
      this._actions.push( action );
    };

    Object2D.prototype.removeAction = function( action ) {
      var index = this._actions.indexOf( action );
      if ( index !== -1 ) {
        this._actions.splice( index, 1 ).setObject( null );
      }
    };

    Object2D.prototype.clearActions = function() {
      for ( var i = this._actions.length - 1; i >= 0; i-- ) {
        this._actions[i].setObject( null );
      }

      this._actions = [];
    };

    Object2D.prototype.getActions = function() {
      return this._actions;
    };

    // Position.
    Object2D.prototype.getX = function() {
      return this.getPosition().x;
    };

    Object2D.prototype.setX = function( x ) {
      this._position.x = x;
      return this;
    };

    Object2D.prototype.getY = function() {
      return this.getPosition().y;
    };

    Object2D.prototype.setY = function( y ) {
      this._position.y = y;
      return this;
    };

    Object2D.prototype.getPosition = function() {
      return this._position;
    };

    Object2D.prototype.setPosition = function() {
      if ( arguments.length === 1 ) {
        this.setX( arguments[0].x );
        this.setY( arguments[0].y );
      } else if ( arguments.length === 2 ) {
        this.setX( arguments[0] );
        this.setY( arguments[1] );
      }

      return this;
    };

    Object2D.prototype.translateX = function( translateX ) {
      this.setX( this.getX() + translateX );
      return this;
    };

    Object2D.prototype.translateY = function( translateY ) {
      this.setY( this.getY() + translateY );
      return this;
    };

    Object2D.prototype.translate = function() {
      if ( arguments.length === 1 ) {
        this.translateX( arguments[0].x );
        this.translateY( arguments[0].y );
      } else if ( arguments.length === 2 ) {
        this.translateX( arguments[0] );
        this.translateY( arguments[1] );
      }

      return this;
    };

    // Angle.
    Object2D.prototype.getAngle = function() {
      return this._angle;
    };

    Object2D.prototype.setAngle = function( angle ) {
      this._angle = angle % 360;
      return this;
    };

    Object2D.prototype.rotate = function( angle ) {
      this.setAngle( this.getAngle() + angle );
      return this;
    };

    // Distance.
    Object2D.prototype.getDistance = function() {
      return this._distance;
    };

    Object2D.prototype.setDistance = function( distance ) {
      this._distance = distance;
      return this;
    };

    Object2D.prototype.radialTranslate = function( radialTranslate ) {
      this.setDistance( this.getDistance() + radialTranslate );
      return this;
    };

    // Color.
    Object2D.prototype.getColor = function() {
      return this._color;
    };

    Object2D.prototype.setColor = function() {
      this.getColor().set.apply( this.getColor(), arguments );
      return this;
    };

    // Visibility.
    Object2D.prototype.isVisible = function() {
      return this._visible;
    };

    Object2D.prototype.setVisible = function( visible ) {
      this._visible = visible;
    };

    // Collision.
    Object2D.prototype.isColliding = function() {
      return this._colliding;
    };

    Object2D.prototype.setColliding = function( colliding ) {
      this._colliding = colliding;
    };

    // JSON.
    Object2D.prototype.fromJSON = function( json ) {
      var jsonObject = JSON.parse( json );

      return this.setX( jsonObject.x || 0 )
                 .setY( jsonObject.y || 0 )
                 .setAngle( jsonObject.angle || 0 )
                 .setDistance( jsonObject.distance || 0 );
    };

    Object2D.prototype.toJSON = function() {
      var object = {};

      object.x = this.getX();
      object.y = this.getY();

      object.angle    = this.getAngle();
      object.distance = this.getDistance();

      return object;
    };

    return Object2D;
  }
);
