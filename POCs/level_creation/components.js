AFRAME.registerComponent('level-generator', {
  init: function() {
    console.log('hello')
    let sceneEl = this.el;
    let level = document.createElement('a-entity');
    level.setAttribute('geometry', 'primitive: level');
    level.setAttribute('material', 'color: #555; metalness: 0.1; roughness: 0.8');
    level.setAttribute('shadow', 'cast: true');
    console.log(level)
    sceneEl.appendChild(level);
  }
})