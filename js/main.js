import { Renderer } from './visualizer.js';
import { setup } from './text_editor.js';

import { Tutorial } from './tutorial.js';

var renderer = 0;
var tutorial = 0;
var currStep = 0;
var totalSteps = 3;



// console.log(gator_ocaml.f("void main() {}"));

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
      updateRenderer()
    }
    //set value of code
    }
  }

function resetCode(){
  tutorial.resetCode(currStep);
  updateRenderer();
}


function newUser(){

  var request = indexedDB.open("users_data");

  request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  var db = request.result;
  var store = db.createObjectStore("users", {keyPath: "user_id", unique: true});
  var titleIndex = store.createIndex("by_compile", "compile");
  var authorIndex = store.createIndex("by_tutorial_step", "tutorial_step");

  var random_id = Math.floor(100000 + Math.random() * 900000);
  // Populate with initial data.
  store.put({user_id: random_id, compile: {}, tutorial_step: 0});

  };
  

  request.onsuccess = function() {
    console.log("success");
    var da = request.result;
    console.log(da);
  };





  
}


// function getData() {

//   var request = indexedDB.open("users_data");


//   var db = request.result;
//   // open a read/write db transaction, ready for retrieving the data


// };



// This is the equivalent of doing <body onload="...">.

document.addEventListener('DOMContentLoaded', () => {

  // And these ones replace onclick and onchange handlers in the HTML.
  document.getElementById("btnCompile").
    addEventListener('click', updateRenderer);
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

  

});
