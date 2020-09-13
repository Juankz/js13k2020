export default AFRAME.registerComponent('trigger', {
  dependencies: ['material'],
  init: function() {
    
    this.system.registerMe(this.el)
    this.el.components.geometry.geometry.computeBoundingBox();
  },
  triggerAction: function() {
    if(!this.active){
      this.active = true;
      this.el.emit('trigger-activated');
    }
  },
  resetTrigger: function() {
    if(this.active){
      this.active = false;
    }
  },
})