import { Renderer } from './visualizer.js';
import { setup } from './text_editor.js';

import { Tutorial } from './tutorial.js';

var renderer = 0;
var tutorial = 0;
var currStep = 0;
var totalSteps = 3;

var mouseIsDown = false;

let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 1
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005

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
      updateRenderer()
    }
    //set value of code
    }
  }

function resetCode(){
  tutorial.resetCode(currStep);
  updateRenderer();
}


function adjustZoom(zoomAmount, zoomFactor)
{
  renderer.z += zoomAmount*20;
}


// This is the equivalent of doing <body onload="...">.
document.addEventListener('DOMContentLoaded', (event) => {
  
  var canvas = document.getElementById("myWebGLCanvas");
  // let ctx = canvas.getContext('2d');



  // And these ones replace onclick and onchange handlers in the HTML.
  document.getElementById("btnCompile").
    addEventListener('click', updateRenderer);
  document.getElementById("select_id2").
    addEventListener('change', modelChanged);
  document.getElementById("btnReset").
    addEventListener('click', resetCode);
  

  // canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))


  canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
 
  var xCoord = 0;
  var yCoord = 0;

  canvas.onmousedown = function(e){
      xCoord = e.x;
      yCoord = e.y;
      mouseIsDown = true;
    }
    canvas.onmouseup = function(e){
        mouseIsDown = false;
    }
    
    canvas.onmousemove = function(e){
        if(!mouseIsDown) return;
        renderer.t += Math.round((xCoord-e.x) * 10) / 10;
        renderer.l += Math.round((xCoord-e.x) * 10) / 10;
        renderer.y += Math.round((e.y-yCoord) * 10) / 10;

        xCoord = e.x;
        yCoord = e.y;
        return false;
    }
    
  
    $('#prev').click(function() {
      step(-1);
    });

    $('#next').click(function() {
      step(1);
    });

  setup();  // This was previously a $(window).on('load') function, but now
            // I've made sure it happens before we do run().
  run();

  newTutorial();
  
});
