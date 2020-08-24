import FloorTexture from '../utils/canvasTextures/floorTexture.js';

AFRAME.registerComponent('texture-material', {
  schema: { 
    texture: {type: 'string', default: 'floor'},
    repeat: {type: 'vec2', default: {x: 1, y: 1}},
    metalness: {type: 'number', default: 0.1},
    roughness: {type: 'number', default: 0.8},

  },
  init: function() {
    let data = this.data;
    let texture_name = data.texture.toLowerCase();
    let texture;
    switch(texture_name) {
      case "floor":
        texture = new FloorTexture().getTexture();
        texture.repeat.set(data.repeat.x, data.repeat.y);
        break;
    }

    this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: data.metalness,
      roughness: data.roughness
    });
  }
});