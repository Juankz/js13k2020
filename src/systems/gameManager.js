export default AFRAME.registerSystem('game-manager', {
  init: function() {
    window.onload = function() {
      this.level = 0;
      this.el.systems['level-generator'].generate(this.level)
    }.bind(this);
  }
})