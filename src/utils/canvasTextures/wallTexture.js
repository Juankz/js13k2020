import CanvasTexture from './canvasTexture.js';

class WallTexture extends CanvasTexture {
  constructor() {
    super();
    this.draw(this.ctx)
  }

  draw(ctx) {
    const lightGray = "#aaaaaa";
    const darkGray = "#444444";
    let w = ctx.canvas.width;
    let h = ctx.canvas.height
    
    var grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, lightGray);
    grd.addColorStop(1, "#555");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = darkGray;
    ctx.fillRect(0, 0, 10, h);
    ctx.fillRect(w-10, 0, w, h);
    ctx.fillRect(0, 0, w, 10);
    ctx.fillRect(0, h-10, w, h);
  }
}

export default WallTexture;