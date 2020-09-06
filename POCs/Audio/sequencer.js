class Sequencer{
  constructor(params) {
    // This is an dict with frequencies of three octaves.
    let frequencies = {
      'C1': 261.63, 'C#1': 277.18, 'D1': 293.66, 'D#1': 311.13,
      'E1': 329.63, 'F1': 349.23, 'F#1': 369.99, 'G1': 391.99,
      'G#1': 415.30, 'A1': 440.00, 'A#1': 466.16, 'B1': 493.88,
      'C2' : 523.25, 'C2#': 554.36, 'D2': 587.33, 'D#2' : 622.25,
      'E2' : 659.25, 'F2' : 698.45, 'F#2' : 739.99, 'G2': 783.99,
      'G#2' : 839.61, 'A2' : 880.00, 'A#2' : 932.33, 'B2' : 987.76,
      'B2' : 987.76, 'C3' : 1046.50, 'C#3' : 1108.73, 'D3' : 1174.66,
      'D#3' : 1244.51, 'E3' : 1318.51, 'F3' : 1396.91, 'F#3' : 1479.97,
      'G3' : 1567.98, 'G#3' : 1661.22, 'A3' : 1760.00, 'A#3' : 1864.65,
      'B3'  : 1975.53,
    }

    // this is dict with figures basic 
    let figures = {
      'w' : 1, 'h' : 0.5, 'q' : 0.25 , 
      'e': 0.125, 's' : 0.0625, 'es' : 0.03125,
      'dbl' : 0.01563
    }
    // this.lead = Object.values(frequencies).reverse();
    this.lead = [
      'C1', 'C#1', 'D1', 'D#1', 'E1','F1','F#1','G1', 'G#1', 'A1', 'A#1', 'B1',
      'C2', 'C#2', 'D2', 'D#2', 'E2','F2','F#2','G2', 'G#2', 'A2', 'A#2', 'B2',
      'C1', 'C#3', 'D3', 'D#3', 'E3','F3','F#3','G3', 'G#3', 'A3', 'A#3', 'B3'
    ].map(n => frequencies[n]);

    this.multipliers = ['w', 'h', 'q', 'e', 's', 'es', 'dbl'].map(n => figures[n]);
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