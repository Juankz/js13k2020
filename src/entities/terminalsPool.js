import Pool from './pool.js';

class terminalsPool extends Pool {
  createEntity(withTrigger) {
    const terminal = document.createElement('a-entity');
    terminal.setAttribute('geometry', 'primitive: plane; width: 2; height: 1');
    terminal.setAttribute('texture-material', 'texture: terminal;');
    terminal.setAttribute('terminal', '');
    terminal.object3D.rotation.set(0, -Math.PI/2, 0);
    document.querySelector('a-scene').appendChild(terminal);

    const support =  document.createElement('a-entity');
    support.setAttribute('material', 'color: gray')
    support.setAttribute('geometry', 'primitive: box; width: 2; height: 1; depth: 0.5;')
    support.object3D.position.z = -0.26;

    const trigger = document.createElement('a-entity');
    trigger.classList.add('trigger');
    trigger.setAttribute('material', 'shader: flat; color: white; transparent: true; opacity: 0')
    trigger.setAttribute('geometry', 'primitive: box; width: 3; height: 0.1; depth: 4;');
    trigger.setAttribute('trigger', '');
    trigger.object3D.position.set(0, -1.6,2);
    trigger.addEventListener('trigger-activated', terminal.components['terminal'].start.bind(terminal.components['terminal']));

    terminal.appendChild(trigger);
    terminal.appendChild(support);
    return terminal;
  }
}

export default terminalsPool;