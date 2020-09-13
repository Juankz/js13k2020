import * as dat from 'dat.gui';


window.addEventListener('load', ()=>{
  var gui = new dat.GUI({name: 'My GUI'});
  
  // Let's wait a little longer so it generates the level
  setTimeout(()=>{
    document.querySelector('a-scene').setAttribute('stats','')        
    let controllers = []
    // Skip to Level
    // document.querySelector('a-scene').systems['game-manager'].level = 6;
    // document.querySelector('a-scene').systems['game-manager'].blinkAndLoadLevel();
    //
    // Dat GUI:
    // let player = document.querySelector('#player');
    // gui.add({label: 'Player'}, 'label')
    // controllers.push(gui.add(player.object3D.position, 'x'));
    // controllers.push(gui.add(player.object3D.position, 'x'));
    // controllers.push(gui.add(player.object3D.position, 'x'));    
    
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