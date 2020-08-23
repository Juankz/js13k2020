AFRAME.registerGeometry('workstation', {
  schema: {
    text: {
      type: 'number',
      default: 0
    }
  },
  init: function(data) {
    let geometries = [];
    geometries[0] = new THREE.BoxGeometry(1, 1, 1);
    geometries[0].translate(0, 0.5, 0);
    geometries[1] = new THREE.BoxGeometry(2, 0.8, 0.1);
    geometries[1].translate(0, 1.4, 0.4);
    geometries[2] = new THREE.PlaneGeometry(2, 0.8);
    geometries[2].translate(0, 1.4, 0.41);
    this.geometry = this.mergeGeometry(geometries)
    console.log('damn')
  },
  mergeGeometry: function(geometries) {
    let mergedGeometry = new THREE.Geometry();
    geometries.forEach((geometry, index) => {
      let mesh = new THREE.Mesh(geometry);
      mesh.updateMatrix();
      mergedGeometry.merge(mesh.geometry, mesh.matrix);
    });
    return mergedGeometry;
  }
})