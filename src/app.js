'use strict';

console.log("Start Party...");

const canvasDiv = document.getElementById("canvas");
var context = canvasDiv.getContext("2d");

const H = 400;
const W = 400;
const GREEN = '#83c785';
const BLACK = '#000000'
const GOLD_RATIO = 0.61803398875;

let X_AXE = 0;
let Y_AXE = 0;

let coord = {x: 0, y: 0};
const history = [{x: W/2, y:H/2}];
let timeouts = [];


let isRequest = false;
let isAnimation = true
let DELAY = 500;

const drawBranch = (length) => {
	console.log(`...draw branch ${length}`)
	context.beginPath();

	context.lineWidth=3;
	context.lineCap = 'round';
	//moveTo bottom center of canvas;
	
// 	context.save();
	moveCursor({x:0, y: 0});
	
// 	let rotation_x = history[history.length-1].x;
// 	let rotation_y = history[history.length-1].y;
// 	context.translate(rotation_x, rotation_y); 
// 	context.rotate( (Math.PI / 180) * 30);  //rotate 30    degrees.
	
	lineTo({x:0, y: length});
	context.strokeStyle = (context.strokeStyle === GREEN) 
		? BLACK 
		: GREEN ;
		
	context.stroke();

// 	context.restore();

	let newLenght = Math.round(length * GOLD_RATIO);
	
	if(newLenght < 5){
		isRequest = false;
		return true
	}

// 	history.pop();

	if (isAnimation) {
		let timeOutId = setTimeout( () => {
				drawBranch(newLenght);
			}, DELAY)
		timeouts.push(timeOutId);
	}   else {
		drawBranch(newLenght);
	}	
}



var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

const draw = (length) => {
	resetCanvas();
	drawBranch(length);
}

draw(slider.value);

slider.oninput = function() {
  output.innerHTML = this.value;

  if(!isRequest) {
  	isRequest = true;
 	isRequest = !draw(this.value);
  } else {
  	timeouts.forEach( (i) => {
		clearTimeout(i);
	} )		
  	resetCanvas();
  	draw(this.value)
  }
}
