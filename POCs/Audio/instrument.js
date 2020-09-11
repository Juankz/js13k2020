class Instrument{
  constructor(audioContext, numberOfOscillators = 1){
    this.context = audioContext;
    this.numberOfOscillators = numberOfOscillators;
  }
  createOscillators() {
    let oscillators = [];
    let gains = [];
    for(let i = 0; i < this.numberOfOscillators; i++){
      let o = this.context.createOscillator();
      let g = this.context.createGain();
      o.connect(g);
      g.connect(this.context.destination);
      oscillators.push(o);
      gains.push(g);
    }
    return [oscillators, gains];
  }

  setFrequencies(oscillators, freqArray) {
    freqArray.forEach((f,i) => {oscillators[i].frequency.value = f});
  }

  setGains(gains, gainArray) {
    gainArray.forEach((f,i) => {gains[i].gain.value = f});
  }

  setExponentialRampToValueAtTime(gains, time){
    gains.forEach(g => {g.gain.exponentialRampToValueAtTime(0.1,time)});
  }

  start(oscillators, time){
    oscillators.forEach(o => {o.start(time)})
  }

  stop(oscillators, time){
    oscillators.forEach(o => {o.stop(time)})
  }

  playNote(note, figure){
  }
}