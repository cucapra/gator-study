import { Renderer } from './visualizer.js';
import { setup } from './text_editor.js';

import { Tutorial } from './tutorial.js';


var renderer = 0;
var tutorial = 0;
var currStep = 0;
var totalSteps = 3;

var cm;

// console.log(gator.f("void main() {}"));

function run() {
 // var vertSrc = document.getElementById("code_vert").value;
  //var fracSrc = document.getElementById("code_frag").value;
  renderer = new Renderer("myWebGLCanvas");
  //console.log(gator_ocaml.f("type vec4 is float[4];void main() { vec4 color = [1., 0.4, 0.25, 1.];vec4 gl_FragColor = color;})"));

  renderer.init();
  renderer.display();
}

function updateRenderer() {
//  var vertSrc = document.getElementById("code_vert").value;
//  var fragSrc = document.getElementById("code_frag").value;
  renderer.updateShader();
  renderer.display();

}

function compile() {

  //do we want more information?
  // eg. model type and if code was reset?

  renderer.updateShader();
  renderer.display();

  const data = JSON.parse(localStorage.getItem('user_data'));
  var time = new Date().getTime();

  var tutorial_array= data.tutorial_step;
  var code_array = data.code;
  var time_array = data.compile_time;
  var error_array = data.error;


  tutorial_array.push();
  code_array.push(cm.getValue());
  time_array.push(time);
  error_array.push(document.getElementById("code_frag_error").innerHTML);

  localStorage.setItem('user_data', JSON.stringify({user_id: data.user_id, tutorial_type: data.tutorial_type, tutorial_step:[], compile_time:time_array, code:code_array, error:error_array}));

  console.log(JSON.parse(localStorage.getItem('user_data')));
}

var interval = setInterval(timerFunc, 40);

function timerFunc() {
  // var offset = 50.0;
  // renderer.t += offset;
  renderer.display();
}

function modelChanged() {
  var d = document.getElementById("select_id2").value;
  renderer.updateModel(d);
  renderer.display();
}

function newTutorial() {
  tutorial = new Tutorial('webgl');
}

  function step(number){
    var total = number + currStep;

    if((total < totalSteps) && (total >= 0)){
    currStep = total;

    if(tutorial!= 0){
      tutorial.nextStep(currStep);
      updateRenderer();
    }
    //set value of code
    }
  }

function resetCode(){
  tutorial.resetCode(currStep);
  updateRenderer();
}


function newUser(){

  localStorage.clear();

  //add random id for user
  var random_id = Math.floor(100000 + Math.random() * 900000);
  //var chosen_tutorial = Math.random() < 0.5 ? "gator" : "glsl";

  //console.log("hey");
  console.log(random_id);

  localStorage.setItem('user_data', JSON.stringify({user_id: random_id, tutorial_type: chosen_tutorial, tutorial_step:[], compile_time:[], code:[], error:[]}));
  // Populate with initial data.
  console.log(localStorage.getItem('user_data'));
}



// This is the equivalent of doing <body onload="...">.

document.addEventListener('DOMContentLoaded', () => {

  // And these ones replace onclick and onchange handlers in the HTML.
  document.getElementById("btnCompile").
    addEventListener('click', compile);
  document.getElementById("select_id2").
    addEventListener('change', modelChanged);
  document.getElementById("btnReset").
    addEventListener('click', resetCode);
  
    $('#prev').click(function() {
      step(-1);
    });

    $('#next').click(function() {
      step(1);
    });

  

  newUser();

  // getData();

  setup();  // This was previously a $(window).on('load') function, but now
            // I've made sure it happens before we do run().
  run();

  newTutorial();

  cm = document.querySelector('.CodeMirror').CodeMirror;


});
