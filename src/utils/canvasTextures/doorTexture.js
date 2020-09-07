import CanvasTexture from './canvasTexture.js';

class DoorTexture extends CanvasTexture {
  constructor() {
    super();
    this.draw(this.ctx)
  }

  draw(ctx) {
    // let windowColor = ""
    let w = ctx.canvas.width;
    let h = ctx.canvas.height
    
    var grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "#444");
    grd.addColorStop(1, '#222');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    grd = ctx.createLinearGradient(0, 0, 100, 200);
    grd.addColorStop(0, "#bbb");
    grd.addColorStop(1, '#888');
    ctx.fillStyle = grd;
    ctx.fillRect(100, 100, 300, 200);


    // ctx.fillStyle = darkGray;
    // ctx.fillRect(0, 0, 10, h);
    // ctx.fillRect(w-10, 0, w, h);
    // ctx.fillRect(0, 0, w, 10);
    // ctx.fillRect(0, h-10, w, h);
  }
}

export default DoorTexture;