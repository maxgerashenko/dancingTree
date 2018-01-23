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
	len:   { min: 0, max: 150 },
	grow:  { min: .0, max: .8 },
	angel: { min: 0, max: 2 },
}

let MP3_PATH = 'https://api.soundcloud.com/tracks/42328219/stream?client_id=b1495e39071bd7081a74093816f77ddb';



AudioAnalyser = (function(audio = MP3_PATH, numBands = 256, smoothing = 0.3) {
  AudioAnalyser.AudioContext = self.AudioContext || self.webkitAudioContext;

  AudioAnalyser.enabled = AudioAnalyser.AudioContext != null;

  function AudioAnalyser(audio, numBands, smoothing) {
    var src;
    this.audio = audio != null ? audio : new Audio();
    this.numBands = numBands != null ? numBands : 256;
    this.smoothing = smoothing != null ? smoothing : 0.3;
    if (typeof this.audio === 'string') {
      src = this.audio;
      this.audio = new Audio();
      this.audio.crossOrigin = "anonymous";
      this.audio.controls = true;
      this.audio.src = src;
      this.audio.loop = true
    }
    this.context = new AudioAnalyser.AudioContext();
    this.jsNode = this.context.createScriptProcessor(2048, 1, 1);
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = this.smoothing;
    this.analyser.fftSize = this.numBands * 2;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
    this.audio.addEventListener('canplay', (function(_this) {
      return function() {
        _this.source = _this.context.createMediaElementSource(_this.audio);
        _this.source.connect(_this.analyser);
        _this.analyser.connect(_this.jsNode);
        _this.jsNode.connect(_this.context.destination);
        _this.source.connect(_this.context.destination);
        return _this.jsNode.onaudioprocess = function() {
          _this.analyser.getByteFrequencyData(_this.bands);
          if (!_this.audio.paused) {
            return typeof _this.onUpdate === "function" ? _this.onUpdate(_this.bands) : void 0;
          }
        };
      };
    })(this));
  }

  AudioAnalyser.prototype.start = function() {
    return this.audio.play();
  };

  AudioAnalyser.prototype.stop = function() {
    return this.audio.pause();
  };

  return AudioAnalyser;
})();

class Updater {
	constructor(bands){
		this.bands = [...bands];
		this.audio_FREQ = this.__getAudioLMH();
	}

	__getAudioLMH(){
		const parts = Math.round(this.bands.length/3);
		const left = this.bands.length % 3;

		let avg = this.__getAVG(this.bands);	
		let low = this.bands.splice(0, parts - 1);
		let middle = this.bands.splice(0, parts - 1)
		let hight = this.bands;

		let low_avg = this.__getAVG(low);
		let middle_avg = this.__getAVG(middle);
		let hight_avg = this.__getAVG(hight);

		console.log(`[${avg}]:${low_avg}-${middle_avg}-${hight_avg}`);
		return {avg, low_avg, middle_avg, hight_avg}
	}	

	__scaleValues(Input, output_config, InputLow = BAND_CONFIG.min, InputHigh = BAND_CONFIG.max){
			//Result := ((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow;
			const result = ((Input - InputLow) / (InputHigh - InputLow)) * (output_config.max - output_config.min) + output_config.min;
			console.log(result);
		return Math.round(result);
	}

	__getAVG(array) {
		var sum = array.reduce(function(a, b) { return a + b; });
		var avg = sum / array.length;
		return Math.round(avg,2);
	}

	render() {
		slider_len.value = value_len.innerHTML = this.__scaleValues(this.audio_FREQ.avg, SLIDERS_CONFIG.len) + 30;
		slider_angle.value = slider_angle.innerHTML = this.__scaleValues(this.audio_FREQ.middle_avg, SLIDERS_CONFIG.angel) + 0.5
		slider_grow.value =  slider_grow.innerHTML = this.__scaleValues(this.audio_FREQ.hight_avg, SLIDERS_CONFIG.grow) + 0.6;

		updateCanvas();
	}
}

if (AudioAnalyser.enabled) {
	try {
  		analyser = new AudioAnalyser(MP3_PATH, NUM_BANDS, SMOOTHING);
        
        analyser.onUpdate = (function(_this) {
          return function(bands) {
            results = bands;
			let updater = new Updater(bands);
			updater.render();
			updateCanvas()
            return results;
          };
        })(this);

        analyser.start();
        
        document.body.appendChild(analyser.audio);

    } catch (_error) {
        error = _error;
  	}
}





		
