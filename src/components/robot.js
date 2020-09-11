const ORIGIN = new THREE.Vector3();
const FORWARD = new THREE.Vector3(0, 0, -1);

let print = false

export default AFRAME.registerComponent('player-detection', {
  dependencies: ['raycaster'],
  init: function() {
    this.instersectionHead = this.instersectionLevel = 0;
    this.playerDetected = false
    this.playerHead = document.getElementById('player-head');
    this.level = document.getElementById('level');
    this.player = document.getElementById('player').object3D;
    this.lightSource = this.el.querySelector('.light').object3D;
    this.robotEye = this.el.querySelector('.eye');
    this.lightSourceParams = this.el.querySelector('.light').object3DMap.light;
    this.raycastWrapper = this.el.querySelector('.raycast').object3D;
    this.raycaster = this.el.querySelector('.raycast').components.raycaster;
    this.currentAngle = 0;
    this.detectionAngle = this.lightSourceParams.angle;
    this.diff = new THREE.Vector3();
    this.lightDir = new THREE.Vector3();
    this.playerPos = new THREE.Vector3();
    this.PlayerSpotted = false;
    this.reactionTime = 0;

  },
  detectIfIntruderVisible: function () {
    let intersection = this.raycaster.getIntersection(this.playerHead);
    if (intersection) {
      this.instersectionHead = intersection.distance;
      intersection = this.raycaster.getIntersection(this.level);
      if (intersection) {
        this.instersectionLevel = intersection.distance;
        if (this.instersectionHead < this.instersectionLevel){
          this.playerDetected = true
        }else{
          this.playerDetected = false
        } 
      }else{
        this.playerDetected = true
      }
    }else{
      this.playerDetected = false
    }
  },
  detectIfIntruderInRange: function(target) {
    this.playerPos.copy(target.getWorldPosition(ORIGIN));
    this.diff.copy(this.lightSource.getWorldPosition(ORIGIN))
    this.diff.sub(target.getWorldPosition(ORIGIN));
    this.lightDir.copy(FORWARD);
    this.lightDir.applyQuaternion(this.lightSource.quaternion)
    this.lightSource.getWorldDirection(this.lightDir);
    
    this.currentAngle = this.lightDir.angleTo(this.diff);
    return this.currentAngle < this.detectionAngle;
  },
  tick: function(time, delta) {
    let intruderInRange = this.detectIfIntruderInRange(this.player);
    intruderInRange |= this.detectIfIntruderInRange(this.playerHead.object3D);
    this.intruderInRange = intruderInRange
    if(intruderInRange) {
      if (this.playerDetected) {
        this.lightSourceParams.color = {r: 1, g: 0.0, b: 0.0};
        this.robotEye.setAttribute('material', 'emissive: red');
        this.reactionTime += delta;
        if(this.reactionTime > delta*3 && !this.playerSpotted){
          this.playerSpotted = true;
          document.querySelector('a-scene').systems['game-manager'].onPlayerSpotted();
        }
      }else{
        this.playerSpotted = false;
        this.robotEye.setAttribute('material', 'emissive: white');
        this.lightSourceParams.color = {r: 1, g: 1, b: 1};
      }
      this.raycastWrapper.lookAt(this.playerHead.object3D.getWorldPosition(ORIGIN));
      this.detectIfIntruderVisible()
    }else{
      print = false;
      this.robotEye.setAttribute('material', 'emissive: white');
      this.lightSourceParams.color = {r: 1, g: 1, b: 1};
    }

  }
})