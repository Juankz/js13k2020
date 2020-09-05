class Vector2 {
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;
  }

  mag() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
  }

  normalize() {
    let mag = this.mag()
    if(mag == 0) return;
    this.x = this.x / mag
    this.y = this.y / mag
  }
}

class Box {
  constructor(x,y,h,w, style='black') {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.style = style;
  }

  draw(ctx) {
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  
  getCenter() {
    return {x: this.x + this.w*0.5, y: this.y + this.h*0.5};
  }
  
  boxesCollide(box1, box2){
    return (box1.x < box2.x + box2.w &&
      box1.x + box1.w > box2.x &&
      box1.y < box2.y + box2.h &&
      box1.y + box1.h > box2.y) 
  }
}
  
class CollisionSolver{
  constructor(boxes, playerBox){
      this.boxes = boxes;
      this.playerBox = playerBox;
      this.boxesThatCollidedWithPlayer = []
      this.collisionEvent = new CustomEvent('collision');

      this.v1 = new Vector2();
      this.v2 = new Vector2();
      this.v3 = new Vector2();
      this.v4 = new Vector2();
  }

  detectCollision(){
    this.boxesThatCollidedWithPlayer = [];

    this.boxes.forEach(box => {
      if(box.boxesCollide(box,this.playerBox)){
        box.style='green';
        this.boxesThatCollidedWithPlayer.push(box);
      }else{
        box.style='black';
      }
    });
  }

  solveCollision() {
    if(this.boxesThatCollidedWithPlayer.length <= 0) return;
    this.v1.x = this.v1.y = 0;
    this.v2.x = this.v2.y = 0;
    this.v3.x = this.v3.y = 0;
    this.v4.x = this.v4.y = 0;

    this.boxesThatCollidedWithPlayer.forEach( box => {
      // Center distance
      this.v1.x += this.playerBox.getCenter().x - box.getCenter().x;
      this.v1.y += this.playerBox.getCenter().y - box.getCenter().y;
      this.v1.normalize();
      this.playerBox.x += this.v1.x * 2;
      this.playerBox.y += this.v1.y * 2;
    })
  }

  update() {
    this.detectCollision()
    this.solveCollision()
  }
}

class Player {
  constructor(x,y,w,h) {
    this.box = new Box(x,y,w,h,'rgba(0,0,0.4,0.4)');
    this.drawBox = new Box(x,y,w,h,'red');
    this.dirVector = new Vector2();
    this.keys = [];
    this.speed = 2;
    this.keyDownHandler = this.onKeyDown.bind(this);
    this.keyUpHandler = this.onKeyUp.bind(this);
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('keyup', this.keyUpHandler)
  }

  onKeyDown(ev){
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
  }
  
  onKeyUp(ev){
    let key = ev.key.toLowerCase();
    let arr = ['w','s','d','a'];
    if (arr.includes(key)){
      if (this.keys.indexOf(key) !== -1){
        this.keys.splice(this.keys.indexOf(key), 1);
      }
    }
  }

  move(delta) {
    this.dirVector.x = this.dirVector.y = 0;
    this.keys.forEach(key => {
      switch(key){
        case 'w':
          this.dirVector.y += -1;
          break;
        case 's':
          this.dirVector.y += 1;
          break;
        case 'a':
          this.dirVector.x += -1;
          break;
        case 'd':
          this.dirVector.x += 1;
          break;
      }
    })

    this.dirVector.normalize();
    this.box.x += this.dirVector.x * this.speed;
    this.box.y += this.dirVector.y * this.speed;
  }

  interpolatePosition(){
    function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    }

    this.drawBox.x = lerp(this.drawBox.x, this.box.x, 0.3);
    this.drawBox.y = lerp(this.drawBox.y, this.box.y, 0.3);
  }

  update(){
    this.interpolatePosition();
    this.move()
  }
}

class Game {
  constructor() {
    this.boxes = [];    
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.createLevel();
    this.player = new Player(50, 50, 50, 50);
    
    this.collisionSolver = new CollisionSolver(this.boxes, this.player.box);

    requestAnimationFrame(this.update.bind(this))
  }

  createLevel() {
    const boxWidth = 50;
    const boxHeight = 50;
    for (let i = 0; i <= 50*9; i+=50) {
      for (let j = 0; j <= 50*9; j+=50){
        if (i == 0 || i == 50*9 || j == 0 || j == 50 * 9 || (i== 50*4 && j < 50*5)){
          this.boxes.push(new Box(i,j,boxWidth, boxHeight));
        }
      }
    }
  }

  drawGrid(ctx) {
    ctx.strokeStyle = 'gray';
    for (let i = 0; i <= 50*10; i+=50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 500);
      ctx.stroke();
    }
    for (let i = 0;  i <= 50*10; i+=50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(500, i);
      ctx.stroke();
    }
    this.ctx.moveTo(0, 0);
  }
  
  drawLevel() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw grid
    this.drawGrid(this.ctx);
    // Draw boxes
    this.boxes.forEach(box => box.draw(this.ctx));
    // Draw player
    // this.player.box.draw(this.ctx)
    this.player.drawBox.draw(this.ctx);
  }

  update() {
    this.player.update()
    this.collisionSolver.update()
    this.drawLevel();
    requestAnimationFrame(this.update.bind(this))
  }
}

new Game();