let s1 = [
  'C2 es',
  'A#2 es',
  'F2 h',
  'G2 h',
  'C2 q'
]

let s2 = [
  'C1 q',
  'C1 q',
  'F2 q',
  'G2 h',
  'C2 q'
]

let s3 = [
  'B3 e', 'F3 e', 'A#3 e', 'F#3 e', 
  'B3 e', 'F3 e', 'A#3 e', 'F#3 e',
  'D3 q', 'D#3 es', 'A#2 es',
  'B3 e', 'F3 e', 'A#3 e', 'F#3 e', 
  'B3 e', 'F3 e', 'A#3 e', 'F#3 e',
  'D3 q', 'D#3 es', 'A#2 es', 'F#2 q',
  'F2 q', 'D2 e', 'D#2 e'
]

let s4 = [
  'C1 w h', 'C1 w h',
  'C1 w h', 'C1 w h',
  'D1 w', 'D1 w',
  'C1 w', 'C1 w',
  'D1 w', 'D1 w',
  'C1 w', 'C1 w',
]

createButton('Play Sequence', ()=>{
  let context = new AudioContext();  
  
  let sequence1 = new Sequencer({
    sequence: s1,
    tempo: 60,
    instrument: new Guitar(context)
  });
  
  let sequence2 = new Sequencer({
    sequence: s2,
    tempo: 60,
    instrument: new Guitar(context)
  });
  
  let play = () => {
    sequence1.play()
    sequence2.play()
    setTimeout(play, 2100);
  }
  play();
});

createButton('Play Piano', ()=>{
  let context = new AudioContext();  
  
  let sequence1 = new Sequencer({
    sequence: s4,
    tempo: 120,
    instrument: new Piano(context)
  });

  let play = () => {
    sequence1.play()
    // setTimeout(play, 10000);
  }
  play();
});