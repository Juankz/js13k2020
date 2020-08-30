export default AFRAME.registerGeometry('robot', {
  schema: {},
  init: function(data) {
    const SEGMENTS = 4;
    const points = [
      new THREE.Vector2(0, 1),
      new THREE.Vector2(0.8, 1),
      new THREE.Vector2(1.4, 2.8)
    ]
    this.geometry = new THREE.LatheGeometry( points, SEGMENTS );
  }
})