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

let s3 = ['D#3 q']

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
    sequence: s3,
    tempo: 60,
    instrument: new Piano(context)
  });

  let play = () => {
    sequence1.play()
    // setTimeout(play, 2100);
  }
  play();
});