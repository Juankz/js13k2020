import CanvasTexture from './canvasTexture.js';

class PositionMarkerTexture extends CanvasTexture {
  constructor() {
    super();
    this.draw(this.ctx)
  }

  draw(ctx) {
    const fromColor = 'rgba(108, 209, 107, 1)'
    const toColor = 'rgba(196, 188, 26, 0)'
    const strokeColor = 'rgba(196, 188, 26, 0.8)'

    const hw = ctx.canvas.width * 0.5;
    const hh = ctx.canvas.height * 0.5;
    const gradient = ctx.createRadialGradient(hw, hh, 0, hw, hh, hw);
    gradient.addColorStop(0, fromColor);
    gradient.addColorStop(1, toColor);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(hw, hh, hw - 30, 0, 2 * Math.PI);
    ctx.stroke(); 
  }
}

export default PositionMarkerTexture;