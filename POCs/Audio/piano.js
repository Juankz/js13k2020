class Piano extends Instrument {
  playNote(noteFreq, time){
    // creates oscillator to create the actual sound with the choosen note frequency
    let o = this.context.createOscillator()
    let o2 = this.context.createOscillator()
    let o3 = this.context.createOscillator()
    let o4 = this.context.createOscillator()
    let o5 = this.context.createOscillator()
    o.frequency.value = noteFreq;
    o2.frequency.value = noteFreq + (Math.random() * 10) - 5;
    o3.frequency.value = noteFreq + (Math.random() * 15) - 5;
    o4.frequency.value = noteFreq / 2;
    o5.frequency.value = noteFreq / 4;


    let g = this.context.createGain() // creates gain to gracefully reduce the sound through time
    let g2 = this.context.createGain() 
    let g3 = this.context.createGain() 
    let g4 = this.context.createGain() 
    let g5 = this.context.createGain() 

    g.gain.value = 0.2
    g2.gain.value = 0.15
    g3.gain.value = 0.12
    g4.gain.value = 0.1
    g5.gain.value = 0.05

    o.connect(g) //Connects oscillator output to gain input
    o2.connect(g2);
    o3.connect(g3);
    o4.connect(g4);
    o5.connect(g5);

    g.connect(this.context.destination) //Conect gain module to the output
    g2.connect(this.context.destination) //Conect gain module to the output
    g3.connect(this.context.destination) //Conect gain module to the output
    g4.connect(this.context.destination) //Conect gain module to the output
    g5.connect(this.context.destination) //Conect gain module to the output

    o.start(this.context.currentTime + time)//Start playing
    o2.start(this.context.currentTime + time) //Start playing
    o3.start(this.context.currentTime + time) //Start playing
    o4.start(this.context.currentTime + time) //Start playing
    o5.start(this.context.currentTime + time) //Start playing

    // Reduces exponentially the sound, this gives a reallystic feeling
    // as the produced sound decreases the same way the sound of a pulled
    // guitar string would decrease.
    g.gain.exponentialRampToValueAtTime(0.1, this.context.currentTime + time + 0.25)
    g2.gain.exponentialRampToValueAtTime(0.1, this.context.currentTime + time + 0.25)
    g3.gain.exponentialRampToValueAtTime(0.1, this.context.currentTime + time + 0.25)
    g4.gain.exponentialRampToValueAtTime(0.1, this.context.currentTime + time + 0.25)
    g5.gain.exponentialRampToValueAtTime(0.1, this.context.currentTime + time + 0.25)

    o.stop(this.context.currentTime + time + 0.5)
    o2.stop(this.context.currentTime + time + 0.5)
    o3.stop(this.context.currentTime + time + 0.5)
    o4.stop(this.context.currentTime + time + 0.5)
    o5.stop(this.context.currentTime + time + 0.5)
  }
}
