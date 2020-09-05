const STAND_HEIGHT = 0.8;
const CROUCH_HEIGHT = 1.6;

export default AFRAME.registerComponent('player', {
  init: function() {
    this.dirVector = new THREE.Vector3();
    this._x = new THREE.Vector3();
    this._z = new THREE.Vector3();
    this.euler = new THREE.Euler( 0, Math.PI/2, 0, 'XYZ' );
    this.camera = document.getElementById('camera');
    this.speed = 2.5;
    this.crouchedDown = false;
    this.keys = [];
    this.keyDownHandler = this.onKeyDown.bind(this);
    this.keyUpHandler = this.onKeyUp.bind(this);
    this.createEvents();
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

  onKeyDown: function (ev){
    let key = ev.key.toLowerCase();
    if(!ev.repeat) {
      switch(key){
        case ' ':
          this.toggleCrouch();
          break;
        default:
          let arr = ['w','s','d','a'];
          if (arr.includes(key)){
            if (this.keys.indexOf(key) == -1){
              this.keys.push(key)
            }
          }
      }
    }
  },
  
  onKeyUp: function (ev){
    let key = ev.key.toLowerCase();
    let arr = ['w','s','d','a'];
    if (arr.includes(key)){
      if (this.keys.indexOf(key) !== -1){
        this.keys.splice(this.keys.indexOf(key), 1);
      }
    }
  },


  createEvents: function() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  },

  move: function(delta) {
    this.dirVector.set(0,0,0);
    this.keys.forEach(key => {
      switch(key){
        case 'w':
          this.dirVector.z += -1;
          break;
        case 's':
          this.dirVector.z += 1;
          break;
        case 'a':
          this.dirVector.x += -1;
          break;
        case 'd':
          this.dirVector.x += 1;
          break;
      }
    })


    this.camera.object3D.getWorldDirection(this._z);
    this._z.y = 0;
    this._x.copy(this._z).applyEuler(this.euler);

    this._z.multiplyScalar(this.dirVector.z);
    this._x.multiplyScalar(this.dirVector.x);

    this._z.normalize();
    this._x.normalize();

    this.el.object3D.position.add(this._z.multiplyScalar(this.speed*delta*0.001)) 
    this.el.object3D.position.add(this._x.multiplyScalar(this.speed*delta*0.001))
  },

  tick: function(time, delta){
    this.move(delta)
  },

  remove: function() {
    document.removeEventListener('keydown',this.keyDownHandler);
    document.removeEventListener('keyup',this.keyUpHandler);
  }
})