function getAudioContext() {
  if(!this.audioContext) {
    this.audioContext = new AudioContext();
  }
  return this.audioContext;
}

class Sound {
  constructor(){
    this.oscillators = []
  }

  createOscillator(number){
    this.oscillators.push(new constext.oscillator());
  }
}

function playSound(){
  let context = getAudioContext();  
  // creates oscillator to create the actual sound with the choosen note frequency
  let o = context.createOscillator()
  let o2 = context.createOscillator()
  let o3 = context.createOscillator()
  o.frequency.value = 440;
  o2.frequency.value = 440/2;
  o3.frequency.value = 440/4;

  let g = context.createGain() // creates gain to gracefully reduce the sound through time
  let g2 = context.createGain() 
  let g3 = context.createGain() 

  g.gain.value = 0.2
  g2.gain.value = 0.1
  g3.gain.value = 0.05

  o.connect(g) //Connects oscillator output to gain input
  o2.connect(g2);
  o3.connect(g3);

  g.connect(context.destination) //Conect gain module to the output
  g2.connect(context.destination) //Conect gain module to the output
  g3.connect(context.destination) //Conect gain module to the output

  o.start(context.currentTime)//Start playing
  o2.start(context.currentTime) //Start playing
  o3.start(context.currentTime) //Start playing

  // Reduces exponentially the sound, this gives a reallystic feeling
  // as the produced sound decreases the same way the sound of a pulled
  // guitar string would decrease.
  g.gain.setTargetAtTime(0, context.currentTime, 0.4)
  g2.gain.setTargetAtTime(0, context.currentTime, 0.4)
  g3.gain.setTargetAtTime(0, context.currentTime, 0.4)

  o.stop(context.currentTime + 0.5)
  o2.stop(context.currentTime + 0.5)
  o3.stop(context.currentTime + 0.5)
}

function kick() {
  let audioContext = getAudioContext();
  var osc = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var gainOsc = audioContext.createGain();
  var gainOsc2 = audioContext.createGain();

  osc.type = "triangle";
  osc2.type = "sine";

  gainOsc.gain.setValueAtTime(1, audioContext.currentTime);
  gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  gainOsc2.gain.setValueAtTime(1, audioContext.currentTime);
  gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
 
  osc.frequency.setValueAtTime(120, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  osc2.frequency.setValueAtTime(50, audioContext.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  osc.connect(gainOsc);
  osc2.connect(gainOsc2);
  gainOsc.connect(audioContext.destination);
  gainOsc2.connect(audioContext.destination);

  osc.start(audioContext.currentTime);
  osc2.start(audioContext.currentTime) + 1;

  osc.stop(audioContext.currentTime + 0.5);
  osc2.stop(audioContext.currentTime + 0.5);

};

function createButton(name, sound){
  const button = document.createElement('button');
  button.innerHTML = name;
  button.addEventListener('click', sound);
  document.querySelector('body').appendChild(button);
}

createButton("String",playSound);
createButton("Kick", kick);