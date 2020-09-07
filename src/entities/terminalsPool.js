import Pool from './pool.js';

class terminalsPool extends Pool {
  createEntity() {
    const terminal = document.createElement('a-entity');
    terminal.setAttribute('geometry', 'primitive: plane; width: 2; height: 1');
    terminal.setAttribute('texture-material', 'texture: terminal;');
    terminal.setAttribute('terminal', '');
    terminal.object3D.rotation.set(0, -Math.PI/2, 0);
    document.querySelector('a-scene').appendChild(terminal);
    return terminal;
  }
}

export default terminalsPool;