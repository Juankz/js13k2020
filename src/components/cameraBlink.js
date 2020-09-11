const STATES = {
  BLIND: 0,
  SEEING: 1
}

AFRAME.registerComponent('camera-blink', {
  dependencies: ['animation'],
  init: function() {
    this.dur = 100;
    this.time = 0;
    this.animating = false;
    this.state = STATES.SEEING;
  },
  animate: function(dur=30) {
    this.dur = dur;
    this.el.visible = true;
    this.time = 0;
    this.state = STATES.SEEING;
    this.el.setAttribute('animation', 'property: components.material.material.opacity; to: 1; dur: 100');
    this.animating = true;
  },
  tick: function(time,delta) {
    if(this.animating) {
      this.time += delta;
      if (this.time > 50 && this.time < 100 && this.state == STATES.SEEING) {
          this.state = STATES.BLIND;
          this.el.emit('playerBlind');
      }else if (this.time >= 100 && this.state == STATES.BLIND){
          this.state = STATES.SEEING;
          this.el.setAttribute('animation', 'property: components.material.material.opacity; to: 0; dur: '+this.dur);
      }else if (this.time > 100 + this.dur){
        this.el.emit('playerReady');
        this.animating = false;
        this.time = 0;
        this.el.visible = false;
      }
    }
  }
});