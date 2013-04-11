// Patterned after libgdx's Action classes (since we're eventually porting this
// codebase anyway).
define(function() {
  function Action() {
    this._entity = null;
  }

  Action.prototype.act = function( delta ) {};

  Action.prototype.restart = function() {};

  Action.prototype.reset = function() {
    this.restart();
  };

  Action.prototype.getEntity = function() {
    return this._entity;
  };

  Action.prototype.setEntity = function( entity ) {
    this._entity = entity;
    return this;
  };

  return Action;
});
