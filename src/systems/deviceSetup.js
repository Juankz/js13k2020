const DEVICES = {
  mobile: 0,
  desktop: 1,
  headset: 2
}

export default AFRAME.registerSystem('device-setup', {
  init: function() {
    this.setupDevice();

    // Double check. At least on Firefox VR the device is not detected until getting in VR mode
    this.el.addEventListener('enter-vr', () => {
      this.setupDevice()
    });
  },
  
  addHand: function(id) {
    let hand = document.createElement('a-entity');
    hand.setAttribute('laser-controls', `hand: ${id}`);
    hand.id = id;
    if(id == 'right') {
      hand.setAttribute('mixin','movement-control');
    }
    document.getElementById('player').appendChild(hand)
  },

  isMobile: function() {
    return this.device == DEVICES.mobile;
  },

  isDesktop: function() {
    return this.device == DEVICES.desktop;
  },

  isHeadset: function() {
    return this.device == DEVICES.headset;
  },

  removeCursor: function() {
    document.getElementById('cursor').remove();
  },

  // The configuration by default suits Desktop and Mobile, if a headset is detected, change the configuration accordingly
  setupDevice: function() {
    if(AFRAME.utils.device.checkHeadsetConnected()){
      if (AFRAME.utils.device.isGearVR() || AFRAME.utils.device.isOculusGo()){
        this.addHand('right');
        this.device = DEVICES.headset;
      } else if(!AFRAME.utils.device.isMobile()){
        this.addHand('right');
        this.addHand('left');
        this.device = DEVICES.headset;
      } else {
        this.device = DEVICES.mobile;
        return;
      }
      this.removeCursor()
    }else{
      this.device = DEVICES.desktop;
    }
  }
})
