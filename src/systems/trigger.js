export default AFRAME.registerSystem('trigger', {
  init: function() {
    this.temp = new THREE.Vector3();
    this.entities = [];
  },

  evaluateCollisions: function() {
    this.entities.forEach(entity => {
      let pp = entity.object3D.worldToLocal(this.temp.copy(this.playerPosition));
      let tb = entity.components.geometry.geometry.boundingBox;
      if (tb.containsPoint(pp)){
        entity.components.trigger.triggerAction()
      }else{
        entity.components.trigger.resetTrigger()
      }
    });
  },

  tick: function() {
    if (!this.playerPosition) {
      let player = document.getElementById('player');
      if(player) {
        this.playerPosition = player.object3D.position;
      } else {
        return;
      }
    }
    this.evaluateCollisions();
  },

  registerMe: function(entity) {
    this.entities.push(entity);
  }
})