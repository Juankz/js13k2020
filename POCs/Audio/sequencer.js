
const FIGURES = {
  'w' : 1, 'h' : 0.5, 'q' : 0.25 , 
  'e': 0.125, 's' : 0.0625, 'es' : 0.03125,
  'dbl' : 0.01563
};

const FREQUENCIES = {
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
};

class Sequencer {
  /*
  sequence: Object
  {
    sequence: Array of string with the format "note duration",
    tempo: Int
    instrument: Instrument Object
  }

  */
  constructor(sequence){
    this.sequence = sequence.sequence;
    this.tempo = sequence.tempo
    this.instrument = sequence.instrument;
  }

  play(){
    let time = 0;
    this.sequence.forEach(element => {
      let [note, figure] = element.split(' ');

  		const beatsPerSecond = 60.0 / this.tempo * FIGURES[figure];
      this.instrument.playNote(FREQUENCIES[note], time);
      time += beatsPerSecond;
    });
  }
}