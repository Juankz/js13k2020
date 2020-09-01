import blueprints from '../utils/blueprints.js';
import Robot from '../entities/robot.js';

export default AFRAME.registerSystem('level-generator', {
  generate: function(blueprintId) {
    this.generateLevel(blueprintId);
    this.placeElements(blueprints[blueprintId], blueprintId);
  },
  generateLevel: function(blueprintId) {
    let level = document.createElement('a-entity');
    level.id = "level";
    level.classList.add('obstacles');
    level.setAttribute('geometry', `primitive: level; blueprintId: ${blueprintId}`)
    level.setAttribute('material','color: gray');
    level.setAttribute('shadow','cast: true; receive: true;');
    this.el.appendChild(level);
  },
  placeElements: function(blueprint, blueprintId) {
    let x = 0, z = 0;
    for (let i = 0; i < blueprint.length - 1; i++){
      switch(blueprint[i]){
        case 'd': //doors
          const door = document.createElement('a-box');
          door.setAttribute('color', 'green');
          door.setAttribute('height', 3);
          door.object3D.position.set(x, 1.5, z);
          this.el.appendChild(door)
          break;
        case 'p': //player
          const  player_pos = document.getElementById('player').object3D.position;
          player_pos.set(x, player_pos.y, z);
          break;
        case '0':
        case '1':
        case '2':
          this.el.appendChild(new Robot(x,z, blueprintId, parseInt(blueprint[i])));
          break;
        case '\n':
          z++;
          x=0;
          break;
        }
      x++;
    }
  }
});