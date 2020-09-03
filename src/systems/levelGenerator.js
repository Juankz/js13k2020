import blueprints from '../utils/blueprints.js';
import DoorsPool from '../entities/doorsPool.js';
import RobotsPool from '../entities/robotsPool.js';
import {robotBehaviours} from '../utils/robotBehaviours.js';


export default AFRAME.registerSystem('level-generator', {
  generate: function(blueprintId) {
    this.levelEntities = []
    this.doorsPool = new DoorsPool();
    this.robotsPool = new RobotsPool();
    this.generateLevel(blueprintId);
    this.placeElements(blueprints[blueprintId], blueprintId);
  },
  clearCurrentLevel: function() {
    this.doorsPool.retrieveAllEntities();
    this.robotsPool.retrieveAllEntities();
  },
  generateLevel: function(blueprintId) {
    let level = document.getElementById('level');
    if (!level){
      level = document.createElement('a-entity');
      level.id = "level";
      level.classList.add('obstacles');
      level.setAttribute('material','color: gray');
      level.setAttribute('shadow','cast: true; receive: true;');
      this.el.appendChild(level);
    }
    level.setAttribute('geometry', `primitive: level; blueprintId: ${blueprintId}`)
  },
  placeElements: function(blueprint, blueprintId) {
    let x = 0, z = 0;
    for (let i = 0; i < blueprint.length - 1; i++){
      switch(blueprint[i]){
        case 'd': //doors
          const door = this.doorsPool.requestEntity();
          door.object3D.position.set(x, 1.5, z);
          break;
        case 'p': //player
          const  player_pos = document.getElementById('player').object3D.position;
          player_pos.set(x, player_pos.y, z);
          break;
        case 'g': //Goal
          let goal = document.getElementById('goal');
          if (!goal) {
            goal = document.createElement('a-entity');
            goal.id = 'goal'
            goal.setAttribute('geometry', 'width: 0.9; height: 0.1; depth: 0.9');
            goal.setAttribute('material', 'color: blue');
            goal.setAttribute('trigger', '');
            goal.setAttribute('goal', '');
            goal.setAttribute('shadow', 'receive: true; cast: false;');
            this.el.appendChild(goal);
          }
          goal.object3D.position.set(x, 0, z);
          break;
        case '0':
        case '1':
        case '2':
          let robotId = parseInt(blueprint[i]);
          const robot = this.robotsPool.requestEntity();
          const robotData = robotBehaviours[blueprintId][robotId]
          robot.object3D.position.set(x, 0, z);
          if(robotData.rotationY){
            robot.object3D.rotation.y = robotData.rotationY;
          }
          robot.attachBehaviour(robotData);
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