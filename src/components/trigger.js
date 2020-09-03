export default AFRAME.registerComponent('trigger', {
  dependencies: ['material'],
  init: function() {
    console.log(this.el.components.material);
    this.system.registerMe(this.el)
    this.el.components.geometry.geometry.computeBoundingBox();
  },
  triggerAction: function() {
    if(!this.active){
      this.active = true;
      this.el.setAttribute('material', 'color: green');
      this.el.emit('trigger-activated');
    }
  },
  resetTrigger: function() {
    if(this.active){
      this.active = false;
      this.el.setAttribute('material', 'color: blue');
    }
  },
})