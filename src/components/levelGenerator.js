import detectPremiumUser from '../utils/webMonetization.js';

AFRAME.registerComponent('level-generator', {
  init: function() {
    // let sceneEl = this.el;
    // let level = document.createElement('a-entity');
    // level.setAttribute('geometry', 'primitive: level');
    // sceneEl.appendChild(level);
    detectPremiumUser().then(this.generateAdditionalContent)
  },
  generateAdditionalContent: function() {
  }
})