'use strict';

const resetCanvas = () => {
	console.log('...reset canvas')
	history = [];
	history.push({x: W/2, y:H});

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
}