const text="Hello"

const canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 512;
    
const ctx = canvas.getContext('2d');
drawHuman(ctx);
// drawWall(ctx);
// drawCircularGradient(ctx)
// drawText(ctx, text)
// drawFloor(ctx);

function drawHuman(ctx){
  let w = ctx.canvas.width;
  let h = ctx.canvas.height
  
  var grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, 'green');
  grd.addColorStop(1, 'red');
  ctx.fillStyle = '#gray';
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


  // ctx.lineTo(200, 400);
  // ctx.lineTo(200, 150);
  // ctx.lineTo(190, 280);
  // ctx.lineTo(160, 280);
  // ctx.lineTo(170, 100);
  // ctx.lineTo(250, 100);
  // ctx.lineTo(300, 150);
  // ctx.lineTo(300, 400);
  // ctx.lineTo(260, 400);
  // ctx.lineTo(250, 250);
}

function drawWall(ctx){
  let w = ctx.canvas.width;
  let h = ctx.canvas.height
  const lightGray = "#aaaaaa";
  const darkGray = "#444444";

  var grd = ctx.createLinearGradient(0, 0, w, 0);
  grd.addColorStop(0, '#555');
  grd.addColorStop(.1, '#eee');
  grd.addColorStop(.9, '#eee');
  grd.addColorStop(1, '#555');
  

  // var grd = ctx.createRadialGradient(w/2, h/2, 1, w/2, h/2, w/1.5);
  // grd.addColorStop(0, "white");
  // grd.addColorStop(1, "black");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
}

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

function drawCircularGradient(ctx) {
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

