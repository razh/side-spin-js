// Patterned after libgdx's Action classes (since we're eventually porting this
// codebase anyway).
define(function() {
  function Action() {
    this._object = null;
  }

  Action.prototype.act = function( delta ) {};

  Action.prototype.restart = function() {};

  Action.prototype.reset = function() {
    this.restart();
  };

  Action.prototype.getObject = function() {
    return this._object;
  };

  Action.prototype.setObject = function( object ) {
    this._object = object;
    return this;
  };

  return Action;
});
