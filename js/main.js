import { Renderer } from './visualizer.js';
import { setup } from './text_editor.js';

import { Tutorial } from './tutorial.js';

var renderer = 0;
var tutorial = 0;
var currStep = 0;
var totalSteps = 3;

function run() {
 // var vertSrc = document.getElementById("code_vert").value;
  //var fracSrc = document.getElementById("code_frag").value;
  renderer = new Renderer("myWebGLCanvas");
  renderer.init();
  renderer.display();
}

function updateRenderer() {
//  var vertSrc = document.getElementById("code_vert").value;
//  var fragSrc = document.getElementById("code_frag").value;
  renderer.updateShader();
  renderer.display();
}

var interval = setInterval(timerFunc, 40);

function timerFunc() {
  var offset = 1.0;
  renderer.t += offset;
  renderer.display();
}

function modelChanged() {
  var d = document.getElementById("select_id2").value;
  console.log("hey1111");
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
    }
    //set value of code
    }
  }

// This is the equivalent of doing <body onload="...">.
document.addEventListener('DOMContentLoaded', (event) => {
  // And these ones replace onclick and onchange handlers in the HTML.
  document.getElementById("btnCompile").
    addEventListener('click', updateRenderer);
  document.getElementById("select_id2").
    addEventListener('change', modelChanged);
  

    $('#prev').click(function() {
      step(-1)
      updateRenderer();
    });

    $('#next').click(function() {
      step(1)
      updateRenderer();
    });

  setup();  // This was previously a $(window).on('load') function, but now
            // I've made sure it happens before we do run().
  run();

  newTutorial();
  
});
