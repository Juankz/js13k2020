import CanvasTexture from './canvasTexture.js';

class FloorTexture extends CanvasTexture {
  constructor() {
    super();
    this.canvas.width = 1024;
    this.textColor = 'black';
    this.bgColor = '#E68C1C';
    this.fullText = `Test
    This is a new line`;
    this.drawnText = '';
    this.textLines = [];
    this.font_size = 60; 
    this.margin = 20;
    this.text_margin = 20;
    this.text_lineheight = this.font_size + 10;
    this.count = 0;
    this.cursorBlinkFrames = 24;
    this.draw(this.ctx)
  }

  draw(ctx) {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = this.textColor;
    ctx.font = `${this.font_size}px monospace`;
    let cursorX, cursorY = this.margin;
    
    for (let i = 0; i < this.textLines.length; i++){
      ctx.fillText(this.textLines[i], this.margin + this.text_margin, this.text_margin + this.text_lineheight*(i+1));
      cursorX = (this.textLines[i].length ) * this.font_size*0.65 + this.text_margin+this.margin;
    }
    cursorY = this.textLines.length*this.text_lineheight - this.text_margin - 5;

    if(this.count <= this.cursorBlinkFrames){
      this.count++
      ctx.fillRect(cursorX, cursorY, this.font_size*0.6, this.font_size);
    }else if(this.count >= 2*this.cursorBlinkFrames){
      this.count = 0
    }else{
      this.count++
    }
  }
}

export default FloorTexture;