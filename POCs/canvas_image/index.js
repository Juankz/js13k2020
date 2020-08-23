const text="Hello"

const canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 512;
    
const ctx = canvas.getContext('2d');
drawText(ctx, text)
// drawFloor(ctx);

function drawText(ctx, textLines) {
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = "green";
  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50); 

  // for(let i = 0; i < textLines.lenght; i++){
  //   ctx.fillText(textLines[i], 10, 50*i); 
  // }

}

function drawShape(ctx){
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 492, 492);
}

function drawHalfHearth(ctx, xoff, yoff){
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(344 + xoff, 216 + yoff);
  ctx.bezierCurveTo(332 + xoff, 225 + yoff, 350 + xoff, 142 + yoff, 425 + xoff, 159 + yoff);
  ctx.bezierCurveTo(440 + xoff, 162 + yoff, 474 + xoff, 252 + yoff, 457 + xoff, 297 + yoff);
  ctx.bezierCurveTo(452 + xoff, 311 + yoff, 361 + xoff, 405 + yoff, 350 + xoff, 395 + yoff);
  ctx.stroke();
}

function drawFloor(ctx) {
  ctx.fillStyle = "#444444";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillRect(256, 256, 256, 256);
  ctx.fillStyle = "#aaaaaa";
  ctx.fillRect(0, 256, 256, 256);
  ctx.fillRect(256, 0, 256, 256);
}

