import Pool from './pool.js';

class DoorsPool extends Pool {
  createEntity() {
    const door = document.createElement('a-box');
    door.classList.add('obstacles');
    door.setAttribute('texture-material', 'texture: door');
    door.setAttribute('height', 3);
    door.setAttribute('shadow', 'receive: true; cast: false;');
    document.querySelector('a-scene').appendChild(door);
    return door;
  }
}

export default DoorsPool;