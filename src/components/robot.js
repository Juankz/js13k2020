const ORIGIN = new THREE.Vector3();

export default AFRAME.registerComponent('robot', {
  dependencies: ['raycaster'],
  init: function() {
    this.playerPos = document.getElementById('player').object3D.position;
    this.camera = document.getElementById('camera').object3D;
    this.raycastWrapper = this.el.querySelector('.raycast');
    
    this.el.addEventListener('raycaster-intersection', e => {
      this.raycaster = e.srcElement;
      this.target = e.detail.els[0];
      console.log(this.target)
    }); 
    this.el.addEventListener('raycaster-intersection-cleared', e => {
      this.raycaster = null;
      this.target = null;
    });

  },
  tick: function() {
    this.raycastWrapper.object3D.lookAt(this.camera.getWorldPosition(ORIGIN));
  }
})