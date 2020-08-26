AFRAME.registerComponent('position-marker', {
  init: function () {
    this.hide();
    setTimeout(()=>{
      this.show();
    },2000)
  },
  hide: function() {
    this.el.setAttribute('visible', 'false')
  },
  show: function() {
    this.el.setAttribute('visible', 'true')
  }
})