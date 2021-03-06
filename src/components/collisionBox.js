import {blueprints} from '../utils/blueprints.js';

export default AFRAME.registerComponent('collision-box', {
  schema: {
    multipleBoxes: {type: 'boolean', default: false},
    blueprintId: {default: 0},
    x: {default: 1},
    y: {default: 1},
    w: {default: 1},
    h: {default: 1},
  },

  init: function() {
    if (!this.data.multipleBoxes) {
      this.x = this.data.x;
      this.y = this.data.y;
      this.w = this.data.w;
      this.h = this.data.h;
      this.c = new THREE.Vector2(this.x + this.w*0.5, this.y + this.h*0.5);
      if (this.el.id=="player"){
        this.system.registerPlayer(this.el);
      }else{
        this.system.registerEntity(this.el);
      }
     // Force update when a new level is created
      document.querySelector('a-scene').addEventListener('level-updated', this.update.bind(this));
    }else{
      /*
      Each box will have the same structure x,y,w,h
      */
     this.boxes = [];
     this.createBoxes(blueprints[this.data.blueprintId].level)
     this.system.registerEntity(this.el);
     // Force update when a new level is created
     document.querySelector('a-scene').addEventListener('level-updated', this.updateLevel.bind(this));
    }
  },

  update: function(){
    if (!this.data.multipleBoxes) {
      this.x = this.data.x;
      this.y = this.data.y;
      this.w = this.data.w;
      this.h = this.data.h;
      this.c = new THREE.Vector2(this.x + this.w*0.5, this.y + this.h*0.5);
    }else{
     this.boxes = [];
     this.createBoxes(blueprints[this.data.blueprintId].level)
    }
  },

  updateLevel(blueprintId){
    this.boxes = [];
    this.createBoxes(blueprints[blueprintId.detail].level)
  },

  createBoxes(blueprint){
    let x = 0, z = 0;
    for (let i = 0; i < blueprint.length - 1; i++){
      switch(blueprint[i]){
        case 'x':
          case 'o':
          this.boxes.push({x: x-0.5, y:z-0.5, w: 1, h:1, c: new THREE.Vector2(x+0.5, z+0.5)})
          break;
        case '\n':
          z++;
          x=0;
          break;
        }
  
      x++;
    }
  },

  pause: function(){
    this.system.unregisterEntity(this.el);
  },

  tick: function() {
    if (!this.data.multipleBoxes) {
      this.c.set(this.x + this.w*0.5, this.y + this.h*0.5);
    }
  },
});