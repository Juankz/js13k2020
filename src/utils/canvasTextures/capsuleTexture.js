import CanvasTexture from './canvasTexture.js';

class WallTexture extends CanvasTexture {
  constructor() {
    super();
    this.draw(this.ctx)
  }

  draw(ctx) {
    let w = ctx.canvas.width;
    let h = ctx.canvas.height
    
    var grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, 'orange');
    grd.addColorStop(1, 'red');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = grd;
    ctx.lineWidth = 6 ;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(245, 420);
    ctx.lineTo(200, 420);
    ctx.lineTo(200, 150);
    ctx.lineTo(190, 280);
    ctx.lineTo(160, 280);
    ctx.lineTo(170, 110);
    ctx.lineTo(200, 90);
    ctx.lineTo(250, 90);
    ctx.stroke();
  
    ctx.moveTo(250, 250);
    ctx.lineTo(255, 420);
    ctx.lineTo(300, 420);
    ctx.lineTo(300, 150);
    ctx.lineTo(310, 280);
    ctx.lineTo(340, 280);
    ctx.lineTo(330, 110);
    ctx.lineTo(300, 90);
    ctx.lineTo(250, 90);
    ctx.stroke();
  
    ctx.moveTo(0, 0);
    ctx.strokeRect(225, 20, 50, 50);
  
  }
}

export default WallTexture;