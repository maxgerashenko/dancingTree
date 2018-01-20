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

	console.log(`Draw branch ${len}`)
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

	// draw2(0, -len, len*0.8, -15);
	const new_len = Math.round(len*len_coef);
	drawBranch(0, -len, new_len, len_coef, r_angle, orientation_angle);
	drawBranch(0, -len, new_len, len_coef, l_angle, orientation_angle);
	// drawBranch(0, -len, new_len, orientation_angle-angle*GOLD_RATIO, orientation_angle, iterations_val)
	// drawBranch(0, -len, new_len, orientation_angle+angle/3, orientation_angle, iterations_val)

	context.restore();
}

updateCanvas();
