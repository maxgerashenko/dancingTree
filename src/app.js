'use strict';

console.log("Start Party...");

// Constants
const H = 400;
const W = 400;
const GREEN = '#83c785';
const BLACK = '#000000'
const GOLD_RATIO = 0.61803398875;
const ANTI_GOLD_RATIO = 1.61803398875;

// Canvas definition
const canvasDiv = document.getElementById("canvas");
var context = canvasDiv.getContext("2d");
context.lineWidth = 2;
context.lineCap = 'round';

// States
let history = [];
let timeouts = [];
let isRequest = false;
let isAnimation = true
let DELAY = 500;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
value_len.innerHTML = slider_len.value;

const draw = (length) => {
	resetCanvas();
	drawBranch(length);
}

function drawBranch(startX, startY, len, len_coef, angle, orientation_angle, isFirst = false) {

	context.beginPath();
	context.save();

	let angel_index = (isFirst) ? 0 : 1;

	context.translate(startX, startY);

	context.rotate((angle * angel_index) + orientation_angle * Math.PI/180);

	context.moveTo(0, 0);  		//line start
	context.lineTo(0, -len);	//line end;
	context.stroke();			//draw

	if(len < 10) {
		context.restore();
		return;
	}

	let l_angle = angle;
	let r_angle = -angle;

	if(orientation_angle != 0 ){		 
		l_angle = (orientation_angle > 0) ? angle*0.01 : (orientation_angle-angle)*0.01
		r_angle = (orientation_angle > 0) ? (orientation_angle-angle)*0.005 : angle*0.01;
	}

	const new_len = Math.round(len*len_coef);
	drawBranch(0, -len, new_len, len_coef, r_angle, orientation_angle);
	drawBranch(0, -len, new_len, len_coef, l_angle, orientation_angle);

	context.restore();
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

const setters_set = {
	len: set_slider_len,

}

function smooth_update(inTime, property, value){
	console.log(value);
	const STEPS = 20;
	let step = Math.abs((window['slider_'+property].value - value) / STEPS);

	let intervalId = setInterval( () => {
		let new_value = (window['slider_'+property].value < value)
			? window['slider_'+property].value = +window['slider_'+property].value + step + ''
			: window['slider_'+property].value = +window['slider_'+property].value - step + '';


		setters_set[property](new_value)

		updateCanvas();
	}, inTime / STEPS);

	setTimeout(()=>{
		clearInterval(intervalId);
	}, inTime + 500);
}

let goId;
function random_go(){
	goId = setInterval( ()=> {
		let direction = Math.random();
		let power = Math.round(Math.random() * 10);
		let new_value;

		power = (power>0.5) ? 1 : 0.5;
		if(direction > 0.5) {
			new_value = +slider_len.value + (power *10* (150/100));
		} else {
			new_value = +slider_len.value - (power *10* (150/100));
		}

		smooth_update(1000, 'len', new_value);
	}, 1000);
}

/**
 * Setters
 */
function random_stop(){
	clearInterval(goId);
}

function set_slider_len(value){
	value_len.innerHTML = value;
	// oscillator.frequency.value = (value-30)*30/150 * (10000/100); // value in hertz
}

updateCanvas();
// oscillator.start();
// gainNode.disconnect(audioCtx.destination);
// random_go();







