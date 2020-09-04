class Sequencer{
  constructor(params) {
    let frequencies = {
      'C': 349.2,
      'C#': 370.0,
      'D': 392.0,
      'D#': 415.3,
      'E': 440.0,
      'F': 466.2,
      'F#': 493.9,
      'G': 523.3,
      'G#': 554.4,
      'A': 587.3,
      'A#': 622.3,
      'B': 659.3
    }
    
    // this.lead = Object.values(frequencies).reverse();
    this.lead = ['C','D','C','E','F','G','A','B'].map(n => frequencies[n]);
    this.multipliers = [1,0.5,1,0.5,0.5,1, 0.5, 1];
    this.t = 0;
    this.tempo = 120;
  
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.g = this.context.createGain() // creates gain to gracefully reduce the sound through time
    this.g.gain.value = 0.2
    this.g.connect(this.context.destination) //Conect gain module to the output
    
  }
  
  play() {
    this.t = this.context.currentTime;
    this.o = this.context.createOscillator()
    this.o.connect(this.g) //Connects oscillator output to gain input
    this.o.start(this.t)//Start playing
    this.lead.forEach(this.playNote.bind(this))
    this.o.stop(this.t);
    
  }
  
  playNote(note,i) {
    const secondsPerBeat = 60.0 / this.tempo * this.multipliers[i];
    
    // Advance the beat number, wrap to zero
    this.o.frequency.setValueAtTime(note, this.t);
    this.t += secondsPerBeat; // Add beat length to last beat time
  }
}

let seq = new Sequencer;
createButton('Play sequence', seq.play.bind(seq));