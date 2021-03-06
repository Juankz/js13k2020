import Pool from './pool.js';
import {BEHAVIOURS} from '../utils/robotBehaviours.js';

class RobotsPool extends Pool {
  createEntity() {
    const lightPos = new THREE.Vector3(0, 2, 1.4);

    const robot = document.createElement('a-entity');
    robot.setAttribute('gameaudio', 'sequence: playerDetected');
    robot.classList.add('robot');
    robot.setAttribute('player-detection','')
    
    const body = document.createElement('a-entity');
    body.setAttribute('geometry', 'primitive: robot');
    body.setAttribute('material', 'color: gray');
    body.object3D.rotation.y = Math.PI/4;
    robot.setAttribute('body', '');

    const head = document.createElement('a-box');
    head.setAttribute('width', 1.4);
    head.setAttribute('height', 0.6);
    head.setAttribute('depth', 1.4);
    head.setAttribute('material', 'color: gray');
    head.object3D.position.set(0,3.6,0);
    head.object3D.rotation.x = THREE.Math.degToRad(10);

    const lightEmitter = document.createElement('a-entity');
    lightEmitter.classList.add('eye');
    lightEmitter.setAttribute('geometry', 'primitive: cylinder; radius: 0.2; height: 0.1;');
    lightEmitter.setAttribute('material', 'emissive: white');
    lightEmitter.object3D.rotation.x = Math.PI/2;
    lightEmitter.object3D.position.set(0, 0, 0.7);

    const light = document.createElement('a-entity');
    light.classList.add('light');
    light.setAttribute('light', 'type: spot; angle: 35; color: fff; castShadow: true; distance: 15');
    light.setAttribute('rotation', '-30 180 0');
    light.object3D.position.set(lightPos.x, lightPos.y, lightPos.z);

    const raycast = document.createElement('a-entity');
    raycast.classList.add('raycast');
    raycast.object3D.position.set(lightPos.x, lightPos.y, lightPos.z);
    raycast.setAttribute('raycaster', `far: 15;
     direction: 0, 0, 1;
     objects: #player-head, .obstacles;`);
    
    head.appendChild(lightEmitter);
    robot.appendChild(head);
    robot.appendChild(body);
    robot.appendChild(light);
    robot.appendChild(raycast);

    robot.attachBehaviour = this.attachBehaviour;

    document.querySelector('a-scene').appendChild(robot);
    return robot;
  }

  attachBehaviour(behaviourData) {
    switch(behaviourData.behaviour) {
      case BEHAVIOURS.TRANSLATION:
        this.setAttribute('translation-behaviour', behaviourData);
        break;
      case BEHAVIOURS.ROTATION:
        this.setAttribute('rotation-behaviour', behaviourData);
        break;
    }
  }
}

export default RobotsPool;