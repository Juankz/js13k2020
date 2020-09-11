AFRAME.registerComponent('player', {
  dependencies: ['collision-box'],
  init: function() {
    this.initialPosition = this.el.object3D.position.clone();
  },

  updateInitialPosition: function(){
    this.initialPosition.copy(this.el.object3D.position);
  },

  reset: function() {
    this.el.components['collision-box'].x = this.initialPosition.x;
    this.el.components['collision-box'].y = this.initialPosition.z;
  }
})