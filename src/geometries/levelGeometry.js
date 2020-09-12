/* Defines a geometry with walls and static obstacles */

import {blueprints} from '../utils/blueprints.js';

AFRAME.registerGeometry('level', {
  schema: {
    blueprintId: {default: 1}
  },

  init: function(data) {
    let geometries = this.generateLevel(blueprints[data.blueprintId].level);
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
  
  generateLevel: function(blueprint) {
    let x = 0, z = 0;
    let geometries = [];
    for (let i = 0; i < blueprint.length - 1; i++){
      switch(blueprint[i]){
        case 'x':
          geometries.push(this.newColumn(x, z, 3));
          break;
        case 'o':
          geometries.push(this.newColumn(x, z, 1.4));
          break;
        case '\n':
          z++;
          x=0;
          break;
        }
  
      x++;
    }
    return geometries;
  },

  newColumn: function(x, z, h){
    let geometry = new THREE.BoxGeometry(1, h, 1);
    geometry.translate(x, h*0.5, z)
    return geometry;
  }
})