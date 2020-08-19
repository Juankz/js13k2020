import './canvasTexture.js';
import CanvasTexture from './canvasTexture.js';
class FloorTexture extends CanvasTexture {
  constructor() {
    super();
    this.draw(this.ctx)
  }

  draw(ctx) {
    const lightGray = "#aaaaaa";
    const darkGray = "#444444";
    const w = this.canvas.width * 0.5;
    const h = this.canvas.height * 0.5;

    ctx.fillStyle = darkGray;
    ctx.fillRect(0, 0, w, h);
    ctx.fillRect(w, h, w, h);

    ctx.fillStyle = lightGray;
    ctx.fillRect(0, h, w, h);
    ctx.fillRect(w, 0, w, h);
  }
}

export default FloorTexture;