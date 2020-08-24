AFRAME.registerComponent('color_change', {
  schema: {
    color: {default: 'red'}
  },
  init: function () {
    var data = this.data;
    var el = this.el;  // <a-box>
    var defaultColor = el.getAttribute('material').color;
    el.addEventListener('mouseenter', function () {
        el.setAttribute('color', data.color);
      });
    el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
  },
})

AFRAME.registerSystem('device-log', {
  init: function() {
    this.updateText()
    this.el.addEventListener('enter-vr', () => {
      this.updateText()
    });
  },
  addLaserControls() {
      let hands = document.createElement('a-entity');
      hands.setAttribute('laser-controls', 'hand: right');
      hands.setAttribute('raycaster','objects: .links; far: 5');
      this.el.appendChild(hands)

      document.querySelector('a-cursor').remove()
  },
  updateText(){
    if(AFRAME.utils.device.checkHeadsetConnected()){
      if(AFRAME.utils.device.isMobile() && !AFRAME.utils.device.isGearVR() && !AFRAME.utils.device.isOculusGo()){
          document.getElementById('text').setAttribute('value', 'is Mobile');     
      }else{
        document.getElementById('text').setAttribute('value', 'is VR Headset');
        this.addLaserControls()
      }
    }else{
      document.getElementById('text').setAttribute('value', 'is Desktop'); 
    }
  }
})