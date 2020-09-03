export default AFRAME.registerComponent('goal', {
  init: function() {
    this.el.addEventListener('trigger-activated', ()=>{
      document.querySelector('a-scene').systems['game-manager'].onGoalReached();
    })
  }
})