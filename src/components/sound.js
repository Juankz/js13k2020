import Piano from '../utils/sound/piano';
import Sequences from '../utils/sound/sequences.js';

export default AFRAME.registerComponent('gameaudio', {
  schema: {
    sequence: {default: 's4'},
    tempo: {default: 30},
    autoplay: {default: false},
    volume: {default: 0.2},
  },
  init: function(){
    this.instrument = new Piano(this.system.audioContext);
    this.playing = false;
    
    if(this.data.autoplay){
      window.addEventListener('click', ()=> {
        this.playSound();
      })
      this.playSound();
    }
  },
  playSound: function() {
    let sequence = Sequences[this.data.sequence];
    this.system.playSequence(sequence, this.data.tempo, this.instrument, this.data.volume)
  }
})