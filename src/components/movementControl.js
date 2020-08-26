export default AFRAME.registerComponent('movement-control', {
  dependencies: ['raycaster'],
  init: function(){
    this.player = document.getElementById('player');
    this.floor = document.querySelector('.floor');
    this.positionMarker = document.getElementById('position-marker');

    this.el.addEventListener('raycaster-intersection', e => {
      this.raycaster = e.srcElement;
      this.target = e.detail.els[0];
      this.positionMarker.components['position-marker'].show()
    }); 
    this.el.addEventListener('raycaster-intersection-cleared', e => {
      this.raycaster = null;
      this.target = null;
      this.positionMarker.components['position-marker'].hide()
    });
    this.el.addEventListener('click', (event)=>{
      if (event.detail.intersectedEl.classList.contains('floor')){
        this.movePlayer(event.detail.intersection.point)
      }
    });
    this.el.addEventListener('triggerdown', (event)=>{
      if (event.detail.intersectedEl.classList.contains('floor')){
        this.movePlayer(event.detail.intersection.point)
      }
    });
  },
  tick: function() {
    if(this.raycaster) {
      if (this.target.classList.contains('floor')){
        let intersection = this.raycaster.components.raycaster.getIntersection(this.target);
        if (!intersection) { return; }
        this.updateMarker(intersection.point);
      }
    }
  },
  updateMarker(pos) {
    this.positionMarker.object3D.position.set(pos.x, pos.y + 0.1, pos.z)
  },
  movePlayer(pos) {
    this.player.object3D.position.set(pos.x, pos.y + 0.1, pos.z)
  }
});