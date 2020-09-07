import * as TerminalText from '../utils/terminal.js';

export default AFRAME.registerComponent('terminal', {
  dependencies: ['texture-material'],

  schema: {
    text: {default: '404 text not found'},
    tutorial: {default: false}
  },

  init: function() {
    this.count = 0;
    this.frames = 0;
    this.fullText = this.data.text;
    this.drawnText = '';
    this.framesBetweenCharacters = 1; 
    this.framesBetweenLines = 5;
    this.canvasEl = this.el.components['texture-material'].canvasEl;
    if(this.data.tutorial) {
      this.loadDeviceInstructions();
      document.querySelector('a-scene').systems['device-setup'].el.addEventListener('device-info-updated', this.loadDeviceInstructions.bind(this))
    }
  },

  loadDeviceInstructions: function(){
    const device = document.querySelector('a-scene').systems['device-setup'];
    if (device.isMobile() || device.is3DOFheadset()) {
      this.fullText = TerminalText.tutorial_mobile;
    } else if(device.isHeadset()) {
      this.fullText = TerminalText.tutorial_VR;
    } else {
      this.fullText = TerminalText.tutorial_desktop;
    }
  },

  processText: function() {
    if(this.count > this.fullText.length) return;
    if(this.frames++ > this.framesBetweenCharacters){
      this.drawnText += this.fullText.charAt(this.count);
      this.canvasEl.textLines = this.drawnText.split('\n');
      this.count++;
      this.frames = 0;
    }
  },

  tick: function() {
    this.canvasEl.getTexture().needsUpdate = true;
    this.processText();
    this.canvasEl.draw(this.canvasEl.ctx);
  }
});