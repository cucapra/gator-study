import { Renderer } from './visualizer.js';
import { setup } from './text_editor.js';

var renderer = 0;

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

// This is the equivalent of doing <body onload="...">.
document.addEventListener('DOMContentLoaded', (event) => {
  // And this one replaces onclick="...".
  document.getElementById("btnCompile").
    addEventListener('click', updateRenderer);

  setup();  // This was previously a $(window).on('load') function, but now
            // I've made sure it happens before we do run().
  run();
});
