import './components/index.js';
import './systems/index.js';

window.onload = function(){
  let scene = document.createElement('a-scene');
  scene.id = "scene";
  scene.setAttribute('level-creator');
  document.querySelector('body').appendChild(scene);
}