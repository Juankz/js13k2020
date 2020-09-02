AFRAME.registerSystem('collision', {
  init: function() {
    this.loading = true;
    this.v = new THREE.Vector3();
    this.entities = [];
    window.onload = () => {
      this.playerOffset = new THREE.Vector3(0,-1.6,0);
      this.player = document.getElementById('player');
      this.playerPoint = this.player.object3D.position.clone().add(this.playerOffset);
      this.loading = false;
    }
  },

  tick: function() {
    if (this.loading){ return; }
    this.playerPoint.copy(this.player.object3D.position).add(this.playerOffset);
    document.getElementById('playerpos').innerHTML = AFRAME.utils.coordinates.stringify(this.playerPoint);
    this.entities.forEach(entity => {
      let pp = entity.object3D.worldToLocal(this.v.copy(this.playerPoint));
      let tb = entity.components.geometry.geometry.boundingBox;
      if (tb.containsPoint(pp)){
        entity.components.collision.triggerAction()
      }else{
        entity.components.collision.resetTrigger()
      }
    });
  },

  registerMe: function(entity) {
    this.entities.push(entity);
  }
});
AFRAME.registerComponent('collision', {
  init: function() {
    this.system.registerMe(this.el)
    this.el.components.geometry.geometry.computeBoundingBox();
    console.log(this.el.components.geometry.geometry.boundingBox)
  },
  triggerAction: function() {
    if(!this.active){
      this.active = true;
      this.el.setAttribute('material', 'color: green');
    }
  },
  resetTrigger: function() {
    if(this.active){
      this.active = false;
      this.el.setAttribute('material', 'color: blue');
    }
  },
});