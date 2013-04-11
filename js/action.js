// Patterned after libgdx's Action classes (since we're eventually porting this
// codebase anyway).
function Action() {
  this._entity = null;
}

Action.prototype.update = function( elapsedTime ) {};

Action.prototype.getEntity = function() {
  return this._entity;
};

Action.prototype.setEntity = function( entity ) {
  this._entity = entity;
  return this;
};

// TemporalAction
// --------------
function TemporalAction() {
  Action.call( this );
}

TemporalAction.prototype = new Action();
TemporalAction.prototype.constructor = TemporalAction;


// RelativeTemporalAction.
function RelativeTemporalAction() {
  TemporalAction.call( this );
}

RelativeTemporalAction.prototype = new TemporalAction();
RelativeTemporalAction.prototype.constructor = RelativeTemporalAction;
