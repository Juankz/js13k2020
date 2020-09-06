	function interpreterSecuence(secuence){ // ['C1q', 'A#3 es']
		let figures = {
			'w' : 1, 'h' : 0.5, 'q' : 0.25 , 
			'e': 0.125, 's' : 0.0625, 'es' : 0.03125,
			'dbl' : 0.01563
		};

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
		};

		if (!secuence){
			console.warning('Not exist parameter');
			return;
		}
		var figure = [];
		var notes = [];
		var context = new AudioContext();
		for (var i = 0; i < secuence.length; i++){
			let params = secuence[i].split(' ');
			notes.push(params[0]);
			figure.push(params[1]);
		};

		var new_figure = figure.map(n => figures[n]);
		var new_note = notes.map(n => frequencies[n]);
		var g = context.createGain();
		var o = context.createOscillator();
		o.connect(g);
		o.type="sawtooth";
		g.connect(context.destination);
		o.start(context.currentTime);
		var timeNote = context.currentTime;
		for (var cnt = 0; cnt < new_figure.length; cnt += 1)
		{
			timeNote += playNote(new_figure[cnt], new_note[cnt],g, o, timeNote, context);
		}
		o.stop(timeNote);
	}

	function playNote(figure, note, gain, osl, timeNote, audioCtx){
		var tempo = 120
		const secondsPerBeat = 60.0 / tempo * figure;
		
		// Advance the beat number, wrap to zero
		gain.gain.value = 0.2;
		gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2)
		osl.frequency.setValueAtTime(note, timeNote);
		return secondsPerBeat; // Add beat length to last beat time
	};

let sec = ['C2 q', 'A#2 es', 'F2 h', 'G2 h', 'C2 q'];
createButton('interpreterSecuence', ()=>{
	interpreterSecuence(sec);
});
