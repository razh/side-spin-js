define(
  [ './action' ],
  function( Action ) {

    function VisibleAction() {
      Action.call( this );

      this._visible = false;
    }

    VisibleAction.prototype = new Action();
    VisibleAction.prototype.constructor = VisibleAction;

    VisibleAction.prototype.act = function( delta ) {
      this.getObject().setVisible( this._visible );
    };

    VisibleAction.prototype.isVisible = function() {
      return this._visible;
    };

    VisibleAction.prototype.setVisible = function( visible ) {
      this._visible = visible;
      return this;
    };

    return VisibleAction;
  }
);
