import {BEHAVIOURS} from '../utils/robotBehaviours.js';

const STATES = {
  INSPECTING: 0,
  MOVING: 1,
  MOVING_BACK: 2,
}
export default AFRAME.registerComponent('translation-behaviour', {
  schema: {
    default: {
      target: new THREE.Vector3(5, 0, 0),
      await: 3000,
      delay: 0,
      speed: 3,
    }
  },
  init: function() {
    this.state = STATES.INSPECTING;
    this.previousState = STATES.INSPECTING;
    this.speed = this.data.speed? this.data.speed: 3;
    this.initialPosition = this.el.object3D.position.clone();
    this.finalPosition = this.el.object3D.position.clone().add(this.data.target);
    this.temp = new THREE.Vector3();
    this.elapsedTime = this.data.await - this.data.delay;
  },
  tick: function(time, delta) {
    switch(this.state){
      case STATES.INSPECTING:
        this.elapsedTime += delta
        if (this.elapsedTime > this.data.await) {
          if(this.previousState == STATES.MOVING){
            this.state = STATES.MOVING_BACK;
          }else{
            this.state = STATES.MOVING;
          }
          this.elapsedTime = 0;
        }
        break;
      case STATES.MOVING:
        this.move(this.finalPosition, delta);
        break;
      case STATES.MOVING_BACK:
        this.move(this.initialPosition, delta);
        break;
    }
  },
  move: function(target, delta) {
    this.temp.copy(target).sub(this.el.object3D.position).normalize();
    this.el.object3D.position.add(this.temp.multiplyScalar(this.speed*delta*0.001))
    if(this.el.object3D.position.distanceToSquared (target) < 0.001){
      this.previousState = this.state;
      this.state = STATES.INSPECTING;
    }
  }
})