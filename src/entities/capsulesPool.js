import Pool from './pool.js';

class CapsulesPool extends Pool {
  createEntity() {
    const capsules = document.createElement('a-box');
    capsules.setAttribute('texture-material', 'texture: capsule');
    capsules.setAttribute('depth', 2);
    capsules.setAttribute('height', 0.5);
    document.querySelector('a-scene').appendChild(capsules);
    return capsules;
  }
}

export default CapsulesPool;