const texts = [
`Starting session
Searching for Ned Snow...
404 person not found`,
  `This is another text`
]

class CanvasImage {
  constructor(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    let textLines = text.split('\n');
    console.log(textLines)
    drawText(ctx, textLines);
    
    setTimeout(()=>{
      text += "\nDecrypting classified information\nSearching for key: W3B_MONETIZ4T10N...\n404 Key not found. Decryption failed\nEnd of Session"
      textLines = text.split('\n');
      drawText(ctx, textLines);
      console.log("I'm drawing again");
    },5000)

    function drawText(ctx, textLines) {
      const font_size = 35; 
      const margin = 20;
      const text_margin = 20;
      let text_lineheight = font_size + 10;
      ctx.fillStyle="grey";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle="black";
      ctx.fillRect(margin, margin, ctx.canvas.width - margin*2, ctx.canvas.height - margin*2);
      ctx.fillStyle = "green";
      ctx.font = `${font_size}px monospace`;
      for (let i = 0; i < textLines.length; i++){
        ctx.fillText(textLines[i], margin + text_margin, text_margin + text_lineheight*(i+1)); 
      }
    }

    document.querySelector('body').appendChild(canvas)
  }
}

AFRAME.registerComponent('workstation', {
  dependencies: ['geometry', 'material'],
  init: function() {
    let texture = new CanvasImage(texts[0]);
    let canvasTexture =  new THREE.CanvasTexture(texture.canvas);
    this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.MeshBasicMaterial({
      map: canvasTexture
    });
    this.texture = canvasTexture;
    this.texture.needsUpdate = true;
  },
  tick: function (time, timeDelta) {
    this.texture.needsUpdate = true;
  }
})