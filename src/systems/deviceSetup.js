const DEVICES = {
  mobile: 0,
  desktop: 1,
  headset3DOF: 2,
  headset6DOF: 3
}

export default AFRAME.registerSystem('device-setup', {
  init: function() {
    this.previousDevice = null;
    this.device = DEVICES.mobile;
    this.player = document.getElementById('player');
    this.camera = document.getElementById('camera');
    this.detectDevice();

    // Double check. At least on Firefox VR the device is not detected until getting in VR mode
    this.el.addEventListener('enter-vr', () => {
      this.detectDevice()
    });
  },
  
  
  isMobile: function() {
    return this.device == DEVICES.mobile;
  },
  
  isDesktop: function() {
    return this.device == DEVICES.desktop;
  },

  is3DOFheadset:function(){
    return this.device == DEVICES.headset3DOF;
  },
  
  isHeadset: function() {
    return this.device == DEVICES.headset6DOF;
  },
    
  addHand: function(which) {
    let hand = document.createElement('a-entity');
    hand.setAttribute('laser-controls', `hand: ${which}`);
    hand.id = which+'-hand';
    if(which == 'right') {
      hand.setAttribute('mixin','movement-control');
    }
    this.player.appendChild(hand)
  },

  addCursor: function(){
    const cursor = document.createElement('a-entity');
    cursor.setAttribute('mixin', 'cursor-config movement-control')
    this.camera.appendChild(cursor);
  },

  addKeyboardControl: function() {
    this.player.setAttribute('keyboard-control','');
  },

  removeCursor: function() {
    document.getElementById('cursor').remove();
  },

  removeHand: function(which){
    document.getElementById(which+'-hand').remove();
  },

  removeKeyboardControl: function() {
    this.player.removeAttribute('keyboard-control');
  },

  clearPreviousConfiguration: function() {
    if(!this.previousDevice) return;

    if(this.previousDevice == DEVICES.headset3DOF){
      this.removeHand('right');
    } else if(this.previousDevice == DEVICES.headset6DOF){
      this.removeHand('right');
      this.removeHand('left');
    } else if(this.previousDevice == DEVICES.mobile){
      this.removeCursor();
      this.el.setAttribute('vr-mode-ui', 'enabled: true');
    } else {
      this.removeKeyboardControl();
    }
  },

  setupDevice: function(){
    if(this.is3DOFheadset()){
      this.addHand('right');
    }else if(this.isHeadset()){
      this.addHand('right');
      this.addHand('left');
    }else if(this.isMobile()){
      this.addCursor()
      this.el.setAttribute('vr-mode-ui', 'enabled: false');
    }else{ //Desktop
      this.addKeyboardControl();
    }
  },

  // The configuration by default suits Desktop and Mobile, if a headset is detected, change the configuration accordingly
  detectDevice: function() {
    if(AFRAME.utils.device.checkHeadsetConnected()){
      if (AFRAME.utils.device.isGearVR() || AFRAME.utils.device.isOculusGo()){
        this.device = DEVICES.headset3DOF;
      } else if(!AFRAME.utils.device.isMobile()){
        this.device = DEVICES.headset6DOF;
      } else {
        this.device = DEVICES.mobile;
      }
    }else{
      this.device = DEVICES.desktop;
    }

    if (this.previousDevice != this.device){
      this.clearPreviousConfiguration();
      this.setupDevice();
      this.previousDevice = this.device;
      this.el.emit('device-info-updated');
    }
  }
})
