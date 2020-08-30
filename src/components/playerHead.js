export default AFRAME.registerComponent('player-head', {
  init: function() {
    this.cameraPos = document.getElementById('camera').object3D.position;
  },
  tick: function () {
    this.el.object3D.position.copy(this.cameraPos);
  }
})