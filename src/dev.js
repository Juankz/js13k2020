import * as dat from 'dat.gui';


window.addEventListener('load', ()=>{
  var gui = new dat.GUI({name: 'My GUI'});
  
  // Let's wait a little longer so it generates the level
  setTimeout(()=>{        
    let controllers = []
    let robot = document.querySelector('.robot');
    let camera = document.querySelector('#camera');
    console.log(robot)
    
    gui.add(robot.object3D.position, 'x', 0, 10);
    gui.add(robot.object3D.rotation, 'y', 0, Math.PI*2);
    controllers.push(gui.add(robot.components.robot, 'currentAngle'));
    gui.add(robot.components.robot, 'detectionAngle', 0, Math.PI);

    gui.add({label: 'Camera'}, 'label')
    gui.add(camera.object3D.position, 'z', -1, 1);
    gui.add(camera.object3D.position, 'y', 0, 1.6);
    gui.add(camera.object3D.position, 'x', -1, 1);

    gui.add({label: 'Intersection'}, 'label')
    controllers.push(gui.add(robot.components.robot, 'intruderInRange'));
    controllers.push(gui.add(robot.components.robot, 'instersectionHead'));
    controllers.push(gui.add(robot.components.robot, 'instersectionLevel'));
    
    
    
    function controllerUpdate(){
      controllers.forEach(controller => {
        controller.getValue();
        controller.updateDisplay();
      })
      requestAnimationFrame(controllerUpdate);
    }
    requestAnimationFrame(controllerUpdate);
    
  }, 1500)

})