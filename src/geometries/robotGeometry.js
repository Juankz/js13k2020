export default AFRAME.registerGeometry('robot', {
  schema: {},
  init: function(data) {
    const SEGMENTS = 4;
    const points = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(2, 0),
      new THREE.Vector2(3, 5)
    ]
    this.geometry = new THREE.LatheGeometry( points, SEGMENTS );
  }
})