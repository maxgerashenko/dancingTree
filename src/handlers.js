'use-strict'

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

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
  }
}

const resetOnClick = () => {
	resetCanvas();
	drawBranch(slider.value);
}

const toggleAnimation = (element) => {
	isAnimation = !isAnimation;
	resetOnClick();

	element.innerText = (isAnimation) ? 'Animation On' : 'Animation Off';
}