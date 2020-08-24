import Robot from '../entities/robot.js';

/*
- Empty space
e Entry
d Destiny
x Column
w Window

R1 robot that turns 180º
*/ 

let levels = [
// 1.
`
---------
---------
xx--x--xx
e-------d
---------
---------
`
];

level = '52A13x23x53x63x93xA3x14eA4d'

function generateLevel(levelSchema) {
  let x = 0, z = 0;
  let geometries = [];
  for (let i = 1; i < levelSchema.length - 1; i++){
    switch(levelSchema(i)){
      case 'R':
        let robot = new Robot(x,z);
        addToScene(robot.getEntity());
        break;
      case 'x':
        let column = newColumn(x, z);
        geometries.push(column);
        break;
      case '\n':
        z++;
        break;
      }

    x += 1;
  }

  return geometries;
}

function addToScene(entity) {
  const scene = document.querySelector('a-scene');
  scene.appendChild(entity)
}

function newColumn(x,z){
  const dimensions = [1, 3, 1];
  const geometry = new THREE.BoxGeometry(dimensions);
  geometry.translate(x, dimensions.y/2, z)
}

export {levels, generateLevel};