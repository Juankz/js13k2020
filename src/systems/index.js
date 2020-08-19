import Robot from '../entities/robot.js';

AFRAME.registerSystem('level-creator', {
  init: function() {
    console.log('tha fuck?')
    scene = document.getElementById('scene');
    let robot = new Robot();
    scene.appendChild(robot.entity);

    let plane = document.createElement('a-plane');
    plane.setAttribute("width", 10);
    plane.setAttribute("height", 10);
    plane.setAttribute("rotation", '-90 0 0');
    plane.setAttribute("texture-material", {texture: 'floor', repeat: {x: 10, y: 10}});
    scene.appendChild(plane);
  }
})