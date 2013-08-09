define([
  'entities/entity',
  'util'
], function( Entity, Util ) {
  'use strict';

  function PhysicsEntity() {
    Entity.call( this );

    this._radialVelocity     = 0.0;
    this._radialAcceleration = 0.0;

    this._maxRadialVelocity     = Number.POSITIVE_INFINITY;
    this._maxRadialAcceleration = Number.POSITIVE_INFINITY;

    this._angularVelocity     = 0.0;
    this._angularAcceleration = 0.0;

    this._maxAngularVelocity     = Number.POSITIVE_INFINITY;
    this._maxAngularAcceleration = Number.POSITIVE_INFINITY;
  }

  PhysicsEntity.prototype = new Entity();
  PhysicsEntity.prototype.constructor = PhysicsEntity;

  PhysicsEntity.prototype.act = function( delta ) {
    Entity.prototype.act.call( this, delta );

    // Convert from milliseconds to seconds.
    delta *= 1e-3;

    // Handle radial translation.
    this.radialAccelerate( this.getRadialAcceleration() * delta );
    this.radialTranslate( this.getRadialVelocity() * delta );

    // Handle rotation.
    this.angularAccelerate( this.getAngularAcceleration() * delta );
    this.rotate( this.getAngularVelocity() * delta );
  };

  // Radial velocity.
  PhysicsEntity.prototype.getRadialVelocity = function() {
    return this._radialVelocity;
  };

  PhysicsEntity.prototype.setRadialVelocity = function( radialVelocity ) {
    var maxRadialVelocity = this.getMaxRadialVelocity();

    this._radialVelocity = Util.clamp( radialVelocity,
                                      -maxRadialVelocity,
                                       maxRadialVelocity );
    return this;
  };

  // Acceleration.
  PhysicsEntity.prototype.getRadialAcceleration = function() {
    return this._radialAcceleration;
  };

  PhysicsEntity.prototype.setRadialAcceleration = function( radialAcceleration ) {
    var maxRadialAcceleration = this.getMaxRadialAcceleration();

    this._radialAcceleration = Util.clamp( radialAcceleration,
                                          -maxRadialAcceleration,
                                           maxRadialAcceleration );
    return this;
  };

  PhysicsEntity.prototype.radialAccelerate = function( radialAcceleration ) {
    this.setRadialVelocity( this.getRadialVelocity() + radialAcceleration );
    return this;
  };

  // Max speed.
  PhysicsEntity.prototype.getMaxRadialVelocity = function() {
    return this._maxRadialVelocity;
  };

  PhysicsEntity.prototype.setMaxRadialVelocity = function( maxRadialVelocity ) {
    this._maxRadialVelocity = maxRadialVelocity;
    return this;
  };

  // Max acceleration.
  PhysicsEntity.prototype.getMaxRadialAcceleration = function() {
    return this._maxRadialAcceleration;
  };

  PhysicsEntity.prototype.setMaxRadialAcceleration = function( maxRadialAcceleration ) {
    this._maxRadialAcceleration = maxRadialAcceleration;
    return this;
  };

  // Angular velocity.
  PhysicsEntity.prototype.getAngularVelocity = function() {
    return this._angularVelocity;
  };

  PhysicsEntity.prototype.setAngularVelocity = function( angularVelocity ) {
    var maxAngularVelocity = this.getMaxAngularVelocity();

    this._angularVelocity = Util.clamp( angularVelocity,
                                       -maxAngularVelocity,
                                        maxAngularVelocity );
    return this;
  };

  // Angular acceleration.
  PhysicsEntity.prototype.getAngularAcceleration = function() {
    return this._angularAcceleration;
  };

  PhysicsEntity.prototype.setAngularAcceleration = function( angularAcceleration ) {
    var maxAngularAcceleration = this.getMaxAngularAcceleration();

    this._angularAcceleration = Util.clamp( angularAcceleration,
                                           -maxAngularAcceleration,
                                            maxAngularAcceleration );
    return this;
  };

  PhysicsEntity.prototype.angularAccelerate = function( accelerate ) {
    this.setAngularVelocity( this.getAngularVelocity() + accelerate );
    return this;
  };

  // Max angular velocity.
  PhysicsEntity.prototype.getMaxAngularVelocity = function() {
    return this._maxAngularVelocity;
  };

  PhysicsEntity.prototype.setMaxAngularVelocity = function( maxAngularVelocity ) {
    this._maxAngularVelocity = maxAngularVelocity;
    return this;
  };

  // Max angular acceleration.
  PhysicsEntity.prototype.getMaxAngularAcceleration = function() {
    return this._maxAngularAcceleration;
  };

  PhysicsEntity.prototype.setMaxAngularAcceleration = function( maxAngularAcceleration ) {
    this._maxAngularAcceleration = maxAngularAcceleration;
    return this;
  };

  return PhysicsEntity;
});
