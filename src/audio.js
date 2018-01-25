var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


// var oscillator = audioCtx.createOscillator();
// var gainNode = audioCtx.createGain();

// oscillator.connect(gainNode);
// gainNode.connect(audioCtx.destination);

// oscillator.type = 'square'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
// oscillator.frequency.value = 1; // value in hertz


// var audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
// audio.play();

const NUM_PARTICLES = 150;
const NUM_BANDS = 128;
const SMOOTHING = 0.5;
const BAND_CONFIG = { min: 0, max: 150}
const SLIDERS_CONFIG = {
	len:   { min: 32, max: 130 },
	grow:  { min: 0, max: 0.8 },
	angel: { min: .2, max: 2.5 },
}

// let MP3_PATH = 'https://api.soundcloud.com/tracks/42328219/stream?client_id=b1495e39071bd7081a74093816f77ddb';
let MP3_PATH = 'https://api.soundcloud.com/tracks/204671299/stream?client_id=b1495e39071bd7081a74093816f77ddb';




class AudioAnalyser {

	constructor(audio = MP3_PATH, numBands = 256, smoothing = 0.3){
		this.AudioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.enabled = this.AudioContext != null; 

		var src;
	    this.audio = audio != null ? audio : new Audio();
	    this.numBands = numBands ? numBands : 256;
	    this.smoothing = smoothing ? smoothing : 0.3;
	    if (typeof this.audio === 'string') {
	      src = this.audio;
	      this.audio = new Audio();
	      this.audio.crossOrigin = "anonymous";
	      this.audio.controls = true;
	      this.audio.src = src;
	      this.audio.loop = true
	    }
	    this.jsNode = this.AudioContext.createScriptProcessor(2048, 1, 1);
	    this.analyser = this.AudioContext.createAnalyser();
	    this.analyser.smoothingTimeConstant = this.smoothing;
	    this.analyser.fftSize = this.numBands * 2;
	    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
	    
	    this.audio.oncanplay = () => {
	    	console.log('OnCanplay...');
	        this.source = this.AudioContext.createMediaElementSource(this.audio);
	        this.source.connect(this.analyser);
	        this.analyser.connect(this.jsNode);
	        this.jsNode.connect(this.AudioContext.destination);
	        this.source.connect(this.AudioContext.destination);
	        this.jsNode.onaudioprocess = (audioProcessingEvent) => {
	          this.analyser.getByteFrequencyData(this.bands);
	          if (!this.audio.paused) {
	            (typeof this.onUpdate === "function") ? this.onUpdate(this.bands) : fasle;
	          }
	      };
	    }
	}

	start() {
		return this.audio.play();
	}

	stop() {
    	return this.audio.pause();
  	};
}

class Updater {
	constructor(bands){
		this.bands = [...bands];
		this.audio_FREQ = this.__getAudioLMH();
	}

	__getAudioLMH(){
		const parts = Math.round(this.bands.length/3);

		let avg = this.__getAVG(this.bands);	
		let low = this.bands.splice(0, parts);
		let middle = this.bands.splice(0, parts)
		let hight = this.bands;

		let low_avg = this.__getAVG(low);
		let middle_avg = this.__getAVG(middle);
		let hight_avg = this.__getAVG(hight);

		console.log(`[${avg}]:${low_avg}-${middle_avg}-${hight_avg}`);
		return {avg, low_avg, middle_avg, hight_avg}
	}	

	__scaleValues(Input, output_config, InputLow = BAND_CONFIG.min, InputHigh = BAND_CONFIG.max){
			//Result := ((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow;
			const result = ((Input - InputLow) / (InputHigh - InputLow)) * 
						   (output_config.max - output_config.min) + 
						    output_config.min;
			console.log(result);
		return Math.round(result*1000)/1000;
	}

	__getAVG(array) {
		var sum = array.reduce(function(a, b) { return a + b; });
		var avg = sum / array.length;
		return Math.round(avg*1000)/1000;
	}

	render() {
		const CONFIG_MAP = {
			Avg: this.audio_FREQ.avg,
			Low: this.audio_FREQ.low_avg,
			Med: this.audio_FREQ.middle_avg,
			Hight: this.audio_FREQ.hight_avg,
		}

		let len_config = {min: double_slider_len.old_from, max: double_slider_len.old_to};
		let grow_config = {min: double_slider_grow.old_from, max: double_slider_grow.old_to};
		let angle_config = {min: double_slider_angle.old_from, max: double_slider_angle.old_to};
		
		
		let len = this.__scaleValues(CONFIG_MAP[$selector_len.find(":selected").text()], len_config);
		let angel = this.__scaleValues(CONFIG_MAP[$selector_angle.find(":selected").text()], angle_config);
		let grow = this.__scaleValues(CONFIG_MAP[$selector_grow.find(":selected").text()], grow_config);

		slider_len.value = value_len.innerHTML = len
		slider_angle.value = slider_angle.innerHTML = angel;
		slider_grow.value =  slider_grow.innerHTML = grow;

		updateCanvas();
	}
}

		
