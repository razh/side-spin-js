define(
  [ '../object2d' ],
  function( Object2D ) {
    function Entity() {
      Object2D.call( this );

      this._objects = [];
    }

    Entity.prototype = new Object2D();
    Entity.prototype.constructor = Entity;

    Entity.prototype.act = function( delta ) {
      Object2D.prototype.act.call( this, delta );

      var objects = this.getObjects();
      for ( var i = 0, n = objects.length; i < n; i++ ) {
        objects[i].act( delta );
      }
    };

    Entity.prototype.draw = function( ctx ) {
      if ( !this.isVisible() ) {
        return;
      }

      ctx.save();

      ctx.translate( this.getX(), this.getY() );
      ctx.rotate( this.getAngle() );

      this.drawObjects( ctx );

      ctx.restore();
    };

    Entity.prototype.drawObjects = function( ctx ) {
      var objects = this.getObjects();
      for ( var i = 0, n = objects.length; i < n; i++ ) {
        objects[i].draw( ctx );
      }
    };

    Entity.prototype.getObjects = function() {
      return this._objects;
    };

    Entity.prototype.addObject = function( object ) {
      this.getObjects().push( object );
      object.setParent( this );
      return this;
    };

    Entity.prototype.removeObject = function( object ) {
      var objects = this.getObjects();
      var index = objects.indexOf( object );
      if ( index !== -1 ) {
        objects.splice( index, 1 );
        object.setParent( null );
      }

      return this;
    };

    // Actions.
    Entity.prototype.addAction = function( action ) {
      Object2D.prototype.addAction.call( this, action );

      var objects = this.getObjects();
      for ( var i = 0, n = objects.length; i < n; i++ ) {
        objects[i].addAction( action.clone() );
      }
    };

    Entity.prototype.removeAction = function( action ) {
      Object2D.prototype.removeAction.call( this, action );

      var objects = this.getObjects();
      var actions;
      var i, j, il, jl;
      for ( i = 0, il = objects.length; i < il; i++ ) {
        actions = objects[i].getActions();
        for ( j = 0, jl = actions.length; j < jl; j++ ) {
          if ( actions[j].equals( action ) ) {
            actions.splice( j, 1 ).setObject( null );
            j--;
            jl--;
          }
        }
      }
    };

    Entity.prototype.clearActions = function() {
      Object2D.prototype.clearActions.call( this );

      var objects = this.getObjects();
      for ( var i = 0, n = objects.length; i < n; i++ ) {
        objects[i].clearActions();
      }
    };

    // JSON.
    Entity.prototype.fromJSON = function( json ) {
      Object2D.prototype.fromJSON.call( this, json );

      var jsonObject = JSON.parse( json );

      return this;
    };

    Entity.prototype.toJSON = function() {
      var object = {};

      return object;
    };

    return Entity;
  }
);
