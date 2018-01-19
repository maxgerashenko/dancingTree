'use strict';

//functions
const convert = (coord) => {
	const axis = history[history.length-1];

	const newCoord = {
		x: axis.x + coord.x,
		y: axis.y - coord.y
	} 

	return history.push(newCoord) && newCoord
}

const moveCursor = (coord) => {
	const n_coord = convert(coord);
	context.moveTo(n_coord.x, n_coord.y);
}

const resetCanvas = () => {
	console.log('...reset canvas')
	history.length = 0;
	history.push({x: W/2, y:H});
	moveCursor({x:0, y: 0});
	// Store the current transformation matrix
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	context.restore();
}

const lineTo = (coord) => {
	const n_coord = convert(coord);
	context.lineTo(n_coord.x, n_coord.y);
}