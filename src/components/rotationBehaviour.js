import {BEHAVIOURS} from '../utils/blueprints.js';

const STATES = {
  INSPECTING: 0,
  MOVING: 1
}
export default AFRAME.registerComponent('rotation-behaviour', {
  schema: {
    default: {
      behaviour: BEHAVIOURS.ROTATION,
      targets: [Math.PI],
      await: 5000,
      delay: 0
    }
  },
  init: function() {
    this.state = STATES.INSPECTING;
    this.previousState = STATES.INSPECTING;
    this.initialRotation = this.el.object3D.rotation.y;
    this.currentTarget = this.data.targets[0];
    this.elapsedTime = this.data.await - this.data.delay;
    this.targetRot = this.initialRotation + this.currentTarget;
    this.targetRot = this.clamp(this.targetRot);
  },
  rotate: function() {

  },
  clamp(angle) {
    if (angle > 2*Math.PI) return angle - Math.PI*2;
    if (angle < 0) return angle + Math.PI*2;
    return angle;
  },
  tick: function(time, delta) {
    switch(this.state){
      case STATES.INSPECTING:
        this.elapsedTime += delta        
        if (this.elapsedTime > this.data.await) {
          this.state = STATES.MOVING;
          this.elapsedTime = 0;
          this.targetRot += this.currentTarget;
          this.targetRot = this.clamp(this.targetRot);
        }
        break;
      case STATES.MOVING:
          this.el.object3D.rotation.y += Math.PI * delta*0.001;
          this.el.object3D.rotation.y = this.clamp(this.el.object3D.rotation.y);
        if(Math.abs(this.el.object3D.rotation.y - this.targetRot) < 0.1){
          this.state = STATES.INSPECTING;
          this.previousState = STATES.MOVING
        }
        break;
    }
  }
})