'use-strict'

const slider_len = document.getElementById("slider_len");
const value_len = document.getElementById("value_len");
const slider_angle = document.getElementById("slider_angle");
const value_angle = document.getElementById("value_angle");
const slider_rotation = document.getElementById("slider_rotation");
const value_rotation = document.getElementById("value_rotation");

value_len.innerHTML = slider_len.value;
value_angle.innerHTML = slider_angle.value;
value_grow.innerHTML = slider_grow.value;
value_rotation.innerHTML = slider_rotation.value;

slider_len.oninput = function() {
  	value_len.innerHTML = this.value;
	updateCanvas()
}

slider_angle.oninput = function() {
  	value_angle.innerHTML = this.value;
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
	drawBranch(slider.value);
}

function updateCanvas(){
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