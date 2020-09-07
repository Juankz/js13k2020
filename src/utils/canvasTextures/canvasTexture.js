class CanvasTexture {
  constructor() { 
    let canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas
  }

  getTexture() {
    let texture = this.texture;
    if (!texture) {
      texture = new THREE.CanvasTexture(this.ctx.canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      this.texture = texture;
    }
    return texture;
  }
}

export default CanvasTexture;