import {blueprints} from '../utils/blueprints.js';
import DoorsPool from '../entities/doorsPool.js';
import RobotsPool from '../entities/robotsPool.js';
import TerminalsPool from '../entities/terminalsPool.js';


export default AFRAME.registerSystem('level-generator', {
  generate: function(blueprintId) {
    this.levelEntities = []
    this.doorsPool = new DoorsPool();
    this.robotsPool = new RobotsPool();
    this.terminalsPool = new TerminalsPool();
    this.generateLevel(blueprintId);
    this.placeElements(blueprints[blueprintId]);
    this.el.emit('level-updated', blueprintId);
  },
  restartLevel() {
    this.restart = true;
  },
  clearCurrentLevel: function() {
    this.doorsPool.retrieveAllEntities();
    this.robotsPool.retrieveAllEntities();
    this.terminalsPool.retrieveAllEntities();
    if(this.level) {level.components['collision-box'].boxes = []}
  },
  generateLevel: function(blueprintId) {
    let level = document.getElementById('level');
    if (!level){
      level = document.createElement('a-entity');
      level.id = "level";
      level.classList.add('obstacles');
      level.setAttribute('texture-material','texture: wall');
      level.setAttribute('shadow','cast: true; receive: true;');
      this.el.appendChild(level);
    }
    level.setAttribute('collision-box', `multipleBoxes: true, blueprintId: ${blueprintId}`);
    level.setAttribute('geometry', `primitive: level; blueprintId: ${blueprintId}`)
    this.level = level;
  },
  placeElements: function(blueprint) {
    let x = 0, z = 0;
    for (let i = 0; i < blueprint.level.length - 1; i++){
      switch(blueprint.level[i]){
        case 'd': //doors
          const door = this.doorsPool.requestEntity();
          door.object3D.position.set(x, 1.5, z);
          break;
        case 'p': //player
          const  player = document.getElementById('player');
          player.object3D.position.set(x, player.object3D.position.y, z);
          player.components['player'].updateInitialPosition();
          player.setAttribute('collision-box', `x: ${x}; y: ${z}; w: 0.95; h:0.95`);
          break;
        case 'T': // Terminal
          const terminal = this.terminalsPool.requestEntity();
          terminal.setAttribute('terminal', `text: ${blueprint.terminal}`);
          terminal.object3D.position.set(x, 1.6, z);
          if (blueprint.terminal == 'tutorial'){
            terminal.setAttribute('terminal', 'tutorial: true');
          }
          terminal.play();
          break;
        case 'g': //Goal
          let goal = document.getElementById('goal');
          if (!goal) {
            goal = document.createElement('a-entity');
            goal.id = 'goal'
            goal.setAttribute('geometry', 'width: 0.9; height: 0.1; depth: 0.9');
            goal.setAttribute('material', 'color: orange');
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
          let robotId = parseInt(blueprint.level[i]);
          const robot = this.robotsPool.requestEntity();
          const robotData = blueprint.robots[robotId];
          robot.id = 'robot'+robotId;
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