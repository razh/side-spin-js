function Game() {
  this.WIDTH = window.innerWidth;
  this.HEIGHT = window.innerHeight;

  this._canvas = document.createElement( '<canvas>' );

  this._canvas.width  = this.WIDTH;
  this._canvas.height = this.HEIGHT;

  document.body.appendChild( this._canvas );

  this._ctx = this._canvas.getContext( '2d' );

  this._entities = [];
}

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {

};

Game.prototype.draw = function() {

};
