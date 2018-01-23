
slider_len.oninput = function() {
  	set_slider_len(this.value)
	updateCanvas()
}

slider_angle.oninput = function() {
  	value_angle.innerHTML = this.value;

  	let wave_types =["sine", "sawtooth", "square", "sawtooth", "triangle"];
  	console.log(wave_types[this.value*100 % wave_types.length]);
//   	oscillator.type = wave_types[this.value*100 % wave_types.length];

	updateCanvas()
}

slider_grow.oninput = function() {
  	value_grow.innerHTML = this.value;
	updateCanvas()
}

slider_rotation.oninput = function() {
  	value_rotation.innerHTML = this.value;
	updateCanvas()
}


function resetOnClick() {
	resetCanvas();
	updateCanvas();
}

function updateCanvas() {
	resetCanvas();
	drawBranch(
		200,
		400,
		slider_len.value,
		slider_grow.value,
		slider_angle.value,
		slider_rotation.value,
		true
	);
}

function onTreeSound(event) {
	let title;

	if (event.target.innerText === "Tree sound ON"){
		title = "Tree sound OFF";
		gainNode.disconnect(audioCtx.destination);
	} else {
		title ="Tree sound ON";
		gainNode.connect(audioCtx.destination);
	}
	event.target.innerText = title;
}

function onGo(event) {
	let title;

	if (event.target.innerText === "Go random"){
		title = "Stop random";
		random_go();
	} else {
		title ="Go random";
		random_stop();
	}
	event.target.innerText = title;
}





































