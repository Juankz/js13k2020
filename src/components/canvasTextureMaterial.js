import FloorTexture from '../canvasTextures/floorTexture.js';

AFRAME.registerComponent('texture-material', {
  schema: { 
    texture: {type: 'string', default: 'floor'},
    repeat: {type: 'vec2', default: {x: 1, y: 1}}

  },
  init: function() {
    let texture_name = this.data.texture.toLowerCase();
    let texture;
    switch(texture_name) {
      case "floor":
        texture = new FloorTexture().getTexture();
        texture.repeat.set(this.data.repeat.x, this.data.repeat.y)
    }

    this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshBasicMaterial({
      map: texture
    });
  }
});