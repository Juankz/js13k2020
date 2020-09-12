import * as TerminalText from '../utils/terminal.js';
import detectPremiumUser from '../utils/webMonetization.js';

export default AFRAME.registerComponent('terminal', {
  dependencies: ['texture-material'],

  schema: {
    text: {default: '404 text not found'},
    tutorial: {default: false},
    startAutomatically: {default: false},
    monetization: {default: false},
    extraInformation: {default: false}
  },

  init: function() {
    this.count = 0;
    this.frames = 0;
    this.fullText = this.data.text;
    this.drawnText = '';
    this.framesBetweenCharacters = 1; 
    this.framesBetweenLines = 5;
    this.started = false;
    this.canvasEl = this.el.components['texture-material'].canvasEl;
    if(this.data.tutorial) {
      this.loadDeviceInstructions();
      document.querySelector('a-scene').systems['device-setup'].el.addEventListener('device-info-updated', this.loadDeviceInstructions.bind(this))
    }
    if(this.data.monetization) {
      let premiumText = this.fullText;
      this.canvasEl.bgColor = 'cyan';
      this.canvasEl.font_size = 30;
      this.canvasEl.text_lineheight = 40;
      this.framesBetweenLines = 1;
      this.fullText = `Can't decrypt data.\nError 404\nKey W3B M0N3T1Z4T10N not found`;
      this.canvasEl.draw(this.canvasEl.ctx);
      detectPremiumUser().then(()=>{
        this.fullText = `Decrypting data with key W3B M0N3T1Z4T10N.......\n`;
        this.fullText += premiumText;  
      })
    }
    if(this.data.extraInformation) {
      this.canvasEl.font_size = 40;
      this.canvasEl.text_lineheight = 50;
      this.framesBetweenLines = 1;
      this.canvasEl.draw(this.canvasEl.ctx);

    }
    if(this.data.startAutomatically){
      this.el.querySelector('.trigger').object3D.visible = false;
      this.started = true;
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

  start: function() {
    if(this.started) return;
    this.started = true;
  },

  tick: function() {
    this.canvasEl.getTexture().needsUpdate = true;
    if(this.started) this.processText();
    this.canvasEl.draw(this.canvasEl.ctx);
  }
});