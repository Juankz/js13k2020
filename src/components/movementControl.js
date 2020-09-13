const STAND_HEIGHT = 1.6;
const CROUCH_HEIGHT = 0.8;
export default AFRAME.registerComponent('movement-control', {
  dependencies: ['raycaster'],
  init: function(){
    this.player = document.getElementById('player');
    this.camera = document.getElementById('camera');
    this.v = new THREE.Vector3();
    this.floor = document.querySelector('.floor');
    this.positionMarker = document.getElementById('position-marker');

    this.el.addEventListener('raycaster-intersection', e => {
      this.raycaster = e.srcElement;
      this.target = e.detail.els[0];
      if(this.target.classList.contains('floor')){
        this.positionMarker.components['position-marker'].show()
      }else{
        this.positionMarker.components['position-marker'].hide()
      }
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
    document.getElementById('crouchButton').addEventListener('click', this.toggleCrouch.bind(this));
  },

  toggleCrouch: function() {
    // TODO: Add interpolation
    if (this.crouchedDown) {
      this.camera.object3D.position.y = STAND_HEIGHT;
      this.crouchedDown = false;
    }else{
      this.camera.object3D.position.y = CROUCH_HEIGHT;
      this.crouchedDown = true;
    }
  },

  tick: function() {
    if(this.raycaster) {
      let intersection = this.raycaster.components['raycaster'].getIntersection(this.floor)
      if(intersection){
        this.positionMarker.components['position-marker'].show()
        this.updateMarker(intersection.point);
      }
    }
  },
  updateMarker(pos) {
    this.positionMarker.object3D.position.set(pos.x, pos.y + 0.1, pos.z)
  },
  setBoxPosition(pos){
    this.collisionBox = this.player.components['collision-box'];
    this.collisionBox.x = pos.x;
    this.collisionBox.y = pos.z;
},
movePlayer(pos) {
  document.getElementById('camera-blink').components['camera-blink'].animate();
  this.setBoxPosition(pos)
  setTimeout(()=>{
    let player_pos = this.player.object3D.position;
    player_pos.set(this.collisionBox.x, player_pos.y, this.collisionBox.y)
  },100)
  }
});