export default AFRAME.registerComponent('movement-control', {
  dependencies: ['raycaster'],
  init: function(){
    this.player = document.getElementById('player');
    this.v = new THREE.Vector3();
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
    this.el.addEventListener('mousedown', (event)=>{
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
    // if(this.collisionBox){
    //   this.v.set(this.collisionBox.x + this.collisionBox.w/2, this.player.object3D.position.y, this.collisionBox.y + this.collisionBox.h/2);
    // }
  },
  updateMarker(pos) {
    this.positionMarker.object3D.position.set(pos.x, pos.y + 0.1, pos.z)
  },
  setBoxPosition(pos){
  //   this.collisionBox = this.player.components['collision-box'];
  //   this.collisionBox.x = pos.x;
  //   this.collisionBox.y = pos.z;
  //   this.player.object3D.position.lerp(this.v, 0.4);
  let player_pos = this.player.object3D.position;
  player_pos.set(pos.x, player_pos.y, pos.z)
},
  movePlayer(pos) {
    document.getElementById('camera-blink').components['camera-blink'].animate();
    setTimeout(()=>{this.setBoxPosition(pos)},100)
  }
});