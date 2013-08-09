define([
  'object2d'
], function( Object2D ) {
  'use strict';

  function Entity() {
    Object2D.call( this );

    this._children = [];
  }

  Entity.prototype = new Object2D();
  Entity.prototype.constructor = Entity;

  Entity.prototype.act = function( delta ) {
    Object2D.prototype.act.call( this, delta );

    this.getChildren().forEach(function( child ) {
      child.act( delta );
    });
  };

  Entity.prototype.draw = function( ctx ) {
    if ( !this.isVisible() ) {
      return;
    }

    ctx.save();

    ctx.translate( this.getX(), this.getY() );
    ctx.rotate( this.getAngle() );

    this.drawChildren( ctx );

    ctx.restore();
  };

  Entity.prototype.drawChildren = function( ctx ) {
    this.getChildren().forEach(function( child ) {
      child.draw( ctx );
    });
  };

  Entity.prototype.getChildren = function() {
    return this._children;
  };

  Entity.prototype.addChild = function( child ) {
    this.getChildren().push( child );
    child.setParent( this );
    return this;
  };

  Entity.prototype.removeChild = function( child ) {
    var children = this.getChildren(),
        index    = children.indexOf( child );

    if ( index !== -1 ) {
      children.splice( index, 1 )[0].setParent( null );
    }

    return this;
  };

  // Actions.
  Entity.prototype.addActionToChildren = function( action ) {
    this.getChildren().forEach(function( child ) {
      child.addAction( action.clone() );
    });
  };

  // Removes similar actions from children (using .equals() check).
  Entity.prototype.removeActionFromChildren = function( action ) {
    var children = this.getChildren(),
        actions,
        i, j, il, jl;

    for ( i = 0, il = children.length; i < il; i++ ) {
      actions = children[i].getActions();
      for ( j = 0, jl = actions.length; j < jl; j++ ) {
        if ( actions[j].equals( action ) ) {
          actions.splice( j, 1 )[0].setObject( null );
          j--;
          jl--;
        }
      }
    }
  };

  Entity.prototype.clearActionsFromChildren = function() {
    this.getChildren().forEach(function( child ) {
      child.clearActions();
    });
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
});
