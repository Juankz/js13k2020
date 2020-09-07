import FloorTexture from '../utils/canvasTextures/floorTexture.js';
import PositionMarkerTexture from '../utils/canvasTextures/positionMarkerTexture.js';
import TerminalTexture from '../utils/canvasTextures/terminalTexture.js';
import WallTexture from '../utils/canvasTextures/wallTexture.js';
import DoorTexture from '../utils/canvasTextures/doorTexture.js';

AFRAME.registerComponent('texture-material', {
  dependencies: ['geometry'],
  schema: { 
    texture: {type: 'string', default: 'floor'},
    repeat: {type: 'vec2', default: {x: 1, y: 1}},
    metalness: {type: 'number', default: 0.1},
    roughness: {type: 'number', default: 0.8},
    transparent: {type: 'boolean', default: false}

  },
  init: function() {
    this.canvasEl = null;
    let data = this.data;
    let texture_name = data.texture.toLowerCase();
    let params = {
      metalness: data.metalness,
      roughness: data.roughness,
      transparent: data.transparent
    }
    switch(texture_name) {
      case "floor":
        params.map = new FloorTexture().getTexture();
        this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshStandardMaterial(params);
        break;
      case "wall":
        params.map = new WallTexture().getTexture();
        this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshStandardMaterial(params);
        break;
      case "door":
        params.map = new DoorTexture().getTexture();
        this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshStandardMaterial(params);
        break;
      case "position-marker":
        params.map = new PositionMarkerTexture().getTexture();
        this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshBasicMaterial(params);
        break;
      case "terminal":
          this.canvasEl = new TerminalTexture();
          params.map = this.canvasEl.getTexture();
          params.map.needsUpdate = true;
          this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshBasicMaterial(params);
          this.material.needsUpdate = true;
          break;
    }
    params.map.repeat.set(data.repeat.x, data.repeat.y);
  }
});