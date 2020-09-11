export default AFRAME.registerSystem('game-manager', {
  init: function() {
    window.onload = function() {
      this.level = 0;
      this.el.systems['level-generator'].generate(this.level)
    }.bind(this);
  },
  onGoalReached: function() {
    this.level++;
    this.blinkAndLoadLevel();
  },
  /* Give the playter a second to process why he got caught.
  Then restart the level  */
  onPlayerSpotted: function(){
    this.blinkAndLoadLevel()
  },

  blinkAndLoadLevel: function() {
    let player = document.getElementById('player'); 
    document.getElementById('camera-blink').components['camera-blink'].animate(500);
    //TODO Stop player
    setTimeout(()=>{
      this.el.systems['level-generator'].clearCurrentLevel();
      this.el.systems['level-generator'].generate(this.level);
    },300)
  }
})