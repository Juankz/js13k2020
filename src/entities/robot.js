class body {
  constructor(x,z) {
    const lightPos = new THREE.Vector3(0, 2, 1.4);

    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('robot', '');
    this.entity.object3D.position.set(x, 0, z);

    const body = document.createElement('a-entity');
    body.setAttribute('geometry', 'primitive: robot');
    body.setAttribute('material', 'color: gray');
    body.object3D.rotation.y = Math.PI/4;
    this.entity.setAttribute('body', '');

    const head = document.createElement('a-box');
    head.setAttribute('width', 1.4);
    head.setAttribute('height', 0.6);
    head.setAttribute('depth', 1.4);
    head.setAttribute('material', 'color: gray');
    head.object3D.position.set(0,3.6,0);
    head.object3D.rotation.x = THREE.Math.degToRad(10);

    const lightEmitter = document.createElement('a-entity');
    lightEmitter.setAttribute('geometry', 'primitive: cylinder; radius: 0.2; height: 0.1;');
    lightEmitter.setAttribute('material', 'emissive: white');
    lightEmitter.object3D.rotation.x = Math.PI/2;
    lightEmitter.object3D.position.set(0, 0, 0.7);

    const light = document.createElement('a-entity');
    light.setAttribute('light', 'type: spot; angle: 20; color: fff; castShadow: true');
    light.setAttribute('rotation', '-30 180 0');
    light.object3D.position.set(lightPos.x, lightPos.y, lightPos.z);

    const raycast = document.createElement('a-entity');
    raycast.classList.add('raycast');
    raycast.object3D.position.set(lightPos.x, lightPos.y, lightPos.z);
    raycast.setAttribute('raycaster', `far: 15;
     direction: 0, 0, 1;
     objects: .playerhead, .obstacles;`);
    
    head.appendChild(lightEmitter);
    this.entity.appendChild(head);
    this.entity.appendChild(body);
    this.entity.appendChild(light);
    this.entity.appendChild(raycast);

    return this.entity;
  }
  
  getEntity() {
    return this.entity;
  }
}

export default body;