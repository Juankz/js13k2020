import {BEHAVIOURS} from '../utils/robotBehaviours.js';

const STATES = {
  INSPECTING: 0,
  MOVING: 1,
  MOVING_BACK: 2,
}
export default AFRAME.registerComponent('translation-behaviour', {
  schema: {
    default: {
      behaviour: BEHAVIOURS.TRANSLATION,
      target: new THREE.Vector3(5, 0, 0),
      await: 3000,
      delay: 0
    }
  },
  init: function() {
    this.state = STATES.INSPECTING;
    this.previousState = STATES.INSPECTING;
    this.speed = 3;
    this.initialPosition = this.el.object3D.position.clone();
    this.temp = new THREE.Vector3();
    this.elapsedTime = this.data.await - this.data.delay;
    this.targetPos = new THREE.Vector3();
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
        this.temp.copy(this.data.target).normalize();
        this.el.object3D.position.add(this.temp.multiplyScalar(this.speed*delta*0.001))
        this.temp.copy(this.initialPosition).add(this.data.target);
        this.targetPos.copy(this.temp);
        if(this.el.object3D.position.distanceToSquared (this.temp) < 0.1){
          this.state = STATES.INSPECTING;
          this.previousState = STATES.MOVING
        }
        break;
      case STATES.MOVING_BACK:
        this.temp.copy(this.data.target).normalize().multiplyScalar(-1);
          this.el.object3D.position.add(this.temp.multiplyScalar(this.speed*delta*0.001))
          if(this.el.object3D.position.distanceToSquared (this.initialPosition) < 0.1){
            this.state = STATES.INSPECTING;
            this.previousState = STATES.MOVING_BACK;
          }
          break;
    }
  }
})