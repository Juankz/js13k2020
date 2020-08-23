/*
- Empty space
e Entry
d Destiny
x Column
w Window

R1 robot that turns 180º
*/ 

let levels = [
// 1.
`
---------
---------
xx--x--xx
e---x---d
---------
----x----
`
];

AFRAME.registerGeometry('level', {
  schema: {},
  init: function() {
    let geometries = this.generateLevel(levels[0]);
    this.geometry = this.mergeGeometry(geometries);
  },
  mergeGeometry: function(geometries) {
    let mergedGeometry = new THREE.Geometry();
    geometries.forEach(geometry => {
      let mesh = new THREE.Mesh(geometry);
      mesh.updateMatrix()
      mergedGeometry.merge(mesh.geometry, mesh.matrix);
    });
    return mergedGeometry;
  },
  generateLevel: function(levelSchema) {
    let x = 0, z = 0;
    let geometries = [];
    for (let i = 1; i < levelSchema.length - 1; i++){
      switch(levelSchema[i]){
        case 'x':
          let column = this.newColumn(x, z);
          geometries.push(column);
          break;
        case '\n':
          z++;
          x=0;
          break;
        }
  
      x--;
    }
    return geometries;
  },
  newColumn: function(x,z){
    let geometry = new THREE.BoxGeometry(1, 3, 1);
    console.log(`x,y,z = ${x}, 1.5, ${z}`)
    geometry.translate(x, 1.5, z)
    return geometry;
  }
})


