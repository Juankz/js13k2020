export default AFRAME.registerSystem('collision-box', {
  init: function() {
    this.entities = [];
    this.boxesThatCollidedWithPlayer = [];

    this.v1 = new THREE.Vector2();
    this.v2 = new THREE.Vector2();
    this.v3 = new THREE.Vector2();
    this.v4 = new THREE.Vector2();
  },

  detectCollision(){
    this.boxesThatCollidedWithPlayer = [];

    this.entities.forEach( el => {
      let boxComponent = el.components['collision-box'];
      if(boxComponent.data.multipleBoxes){
        boxComponent.boxes.forEach(box => {
          if(this.boxesCollide(box,this.playerBox)){
            this.boxesThatCollidedWithPlayer.push(box);
          }
        });
      }else{
        if(this.boxesCollide(boxComponent,this.playerBox)){
          this.boxesThatCollidedWithPlayer.push(boxComponent);
        }
      }
    });
  },


  boxesCollide: function(box1, box2){
    return (box1.x < box2.x + box2.w &&
      box1.x + box1.w > box2.x &&
      box1.y < box2.y + box2.h &&
      box1.y + box1.h > box2.y) 
  },

  solveCollision(delta) {
    if(this.boxesThatCollidedWithPlayer.length <= 0) return;
    this.v1.x = this.v1.y = 0;
    this.v2.x = this.v2.y = 0;
    this.v3.x = this.v3.y = 0;
    this.v4.x = this.v4.y = 0;

    this.boxesThatCollidedWithPlayer.forEach( box => {
      // Center distance
      this.v1.x += this.playerBox.c.x - box.c.x;
      this.v1.y += this.playerBox.c.y - box.c.y;
      this.v1.normalize();
      this.playerBox.x += this.v1.x * 1.5 * delta*0.001;
      this.playerBox.y += this.v1.y * 1.5 * delta*0.001;
    })
  },

  registerEntity: function(el){
    this.entities.push(el);
  },

  registerPlayer: function(el) {
    this.player = el;
    this.playerBox = el.components['collision-box'];
  },

  unregisterEntity: function(el){
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  },

  tick: function(time, delta) {
    this.detectCollision();
    this.solveCollision(delta);
  }
})