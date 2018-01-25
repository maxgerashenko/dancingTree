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


const $double_slider_len = $("#double-slider-len");
const $double_slider_grow = $("#double-slider-grow");
const $double_slider_angle = $("#double-slider-angle");

const $selector_len = $('#selector-len');
const $selector_grow = $('#selector-grow');
const $selector_angle = $('#selector-angle');

$selector_len.change( () => {
    console.log($(this).text());
})

const selector_len = $selector_len.find(":selected").text();
const selector_grow = $selector_grow.find(":selected").text();
const selector_angle = $selector_angle.find(":selected").text();

// $selector_len.change(function() {
//   alert( "Handler for .change() called." );
// });

$("select").horizontalSelector();

$double_slider_len.ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 150,
        from: 30,
        to: 80,
        type: 'double',
        step: 1,
        prefix: "",
        grid: true,
        onChange: (data) => {
        	console.log('from', data.from_pretty);
        	console.log('to', data.to_pretty);
        }
    });


$double_slider_grow.ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 0.8,
        from: 0.3,
        to: 0.6,
        type: 'double',
        step: 0.01,
        prefix: "",
        grid: true,
        onChange: (data) => {
            console.log('from', data.from_pretty);
            console.log('to', data.to_pretty);
        }
    });

$double_slider_angle.ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 3.25,
        from: 0.2,
        to: 2.5,
        type: 'double',
        step: 0.1,
        prefix: "",
        grid: true,
        onChange: (data) => {
            console.log('from', data.from_pretty);
            console.log('to', data.to_pretty);
        }
    });


 const double_slider_len = $double_slider_len.data("ionRangeSlider");
 const double_slider_grow = $double_slider_grow.data("ionRangeSlider");
 const double_slider_angle = $double_slider_angle.data("ionRangeSlider");

//  slider.update({
//     from: 300,
//     to: 400
// });