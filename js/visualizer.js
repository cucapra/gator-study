// A funky this Parcel can do is inline text file data into the bundle so you
// can use it directly! It looks for `readFileSync` calls and gets the data at
// compile time.
// https://parceljs.org/javascript.html
import fs from 'fs';

var glm = require("gl-matrix");
var mat4 = glm.mat4;
var createOrbitCamera = require("orbit-camera");

 
var camera = createOrbitCamera([Math.cos(1.5),  Math.sin(1.5), 1.5, // eye
              0.0, 0.0,  0.0, // look at
              0.0, 0.0, 1.5]);

var xCoord = 0;
var yCoord = 0;
var mouseIsDown = false;

const teapotData = fs.readFileSync('./models/teapot.txt');
const cubeData = fs.readFileSync('./models/cube.txt');

export function Renderer(canvasName) 
{

var cm = document.querySelector('.CodeMirror').CodeMirror;

  const modelMap = {
    'teapot': teapotData,
    'cube': cubeData,
  };

  function showCode()
  {
      var text = cm.getValue();
      return(text);
  }

  // public member
  this.t = 0.0; //x
  this.y = 0.0; //y
  this.z = 0.0; //zoom

  this.modeVal = 1;
  this.lightPos = new Float32Array(3);
  this.lightVec = new Float32Array(3);
  this.attenuation = 0.01;
  
  // private members (inside closure)
  var canvasName = canvasName;
  var vertSrc = document.getElementById("code_vert").value;;
  // var fragSrc= = fragSrc;
  var fragSrc = showCode();
  var canvas;
  var gl;
  var sceneVertNo = 0;
  var bufID;
  var progID = 0;
  var vertID = 0;
  var fragID = 0;
  var vertexLoc = 0;
  var texCoordLoc = 0;
  var normalLoc = 0;
  var projectionLoc = 0;
  var modelviewLoc = 0;
  var normalMatrixLoc = 0;
  var modeLoc = 0;
  var lightPosLoc = 0;
  var lightVecLoc = 0;
  var attenuationLoc = 0;
  var projection = new Float32Array(16);
  var modelview = new Float32Array(16);
  var currentModel = 'teapot';

  // public 
  this.updateShader = function (newfragSrc) {
    fragSrc = showCode();
    
    gl.deleteProgram(progID);
    gl.deleteShader(fragID);
    
    setupShaders();
  }

  
  
  // public 
  this.updateModel = function (newModel) {
    currentModel = newModel;
    
    gl.deleteProgram(progID);
    gl.deleteShader(vertID);
    gl.deleteShader(fragID);
    gl.deleteBuffer(bufID);

    this.init();
  }
  
  // public 
  this.init = function () {
    this.canvas = window.document.getElementById(canvasName);
    try {
      gl = this.canvas.getContext("experimental-webgl");
    } catch (e) {}
    if (!gl) {
        window.alert("Error: Could not retrieve WebGL Context");
        return;
    }
    
    gl.enable(gl.DEPTH_TEST);
    
    setupShaders();

    // generate a Vertex Buffer Object (VBO)
    bufID = gl.createBuffer();
    
    var sceneVertexData = loadVertexData(currentModel);
    
    sceneVertNo = sceneVertexData.length / (3+2+3);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, bufID);
    gl.bufferData(gl.ARRAY_BUFFER, sceneVertexData, gl.STATIC_DRAW);
    
    if(vertexLoc != -1) {
      // position
      var offset = 0;
      var stride = (3+2+3)*Float32Array.BYTES_PER_ELEMENT;
      gl.vertexAttribPointer(vertexLoc, 3, gl.FLOAT, false, stride, offset);
      gl.enableVertexAttribArray(vertexLoc);
    }
    if(texCoordLoc != -1) {
      // texCoord
      offset = 0 + 3*Float32Array.BYTES_PER_ELEMENT;
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, stride, offset);
       gl.enableVertexAttribArray(texCoordLoc);
    }
    
    if(normalLoc != -1) {
      // normal
      offset = 0 + (3+2)*Float32Array.BYTES_PER_ELEMENT;
      gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, stride, offset);
      gl.enableVertexAttribArray(normalLoc);
    }
    this.resize(this.canvas.width, this.canvas.height);
  }
  


  function loadVertexData(modelName) {
    var data = new Float32Array(0);
    var modelStr = modelMap[modelName].toString();
     
    if (!modelStr) {
      alert("unknown model: " + modelName);

    }else{
      var floatVals = modelStr.split('\n');
      
      var numFloats = parseInt(floatVals[0]);
      if(numFloats % (3+2+3) != 0) return data;
      data = new Float32Array(numFloats);
      for(var k = 0; k < numFloats; k++) {
        data[k] = floatVals[k+1];
      }
    }
    return data;
  }

  //public 
  this.resize = function (w, h) {
    gl.viewport(0, 0, w, h);
    
    // this function replaces gluPerspective
    mat4Perspective(projection, 45.0, w/h, 0.5, 4.0);
    //mat4Print(projection);
  }


  //public 
  this.display = function () {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    viewMatrix = camera.view(modelview);

    var canvas = document.getElementById("myWebGLCanvas");
    var scale = 1;

    function zoom(event) {
      scale = event.deltaY * 0.01;
      // Restrict scale
      // scale = Math.min(Math.max(.125, scale), 4);
      camera.zoom(scale * 0.001);
    }

  canvas.addEventListener( 'wheel', (e) => zoom(e), {passive: true})

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

        camera.rotate([(e.x-1000)/canvas.width-0.5, e.y/canvas.height-0.5],
                      [(xCoord-1000)/canvas.width-0.5, yCoord/canvas.height-0.5])

        xCoord = e.x;
        yCoord = e.y;
        return false;
    }
    

    var modelviewInv = new Float32Array(16);
    var normalmatrix = new Float32Array(16);
    mat4Invert(modelview, modelviewInv);
    mat4Transpose(modelviewInv, normalmatrix);
    
    gl.useProgram(progID);
    
    // load the current projection and modelview matrix into the
    // corresponding UNIFORM variables of the shader
    gl.uniformMatrix4fv(projectionLoc, false, projection);
    gl.uniformMatrix4fv(modelviewLoc, false, modelview);
    if(normalMatrixLoc != -1)  gl.uniformMatrix4fv(normalMatrixLoc, false, normalmatrix);
    if(modeLoc != -1) gl.uniform1i(modeLoc, this.modeVal);
    if(lightPosLoc != -1) gl.uniform3fv(lightPosLoc, this.lightPos);
    if(lightVecLoc != -1) gl.uniform3fv(lightVecLoc, this.lightVec);
    if(attenuationLoc != -1) gl.uniform1f(attenuationLoc, this.attenuation);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, bufID);
    gl.drawArrays(gl.TRIANGLES, 0, sceneVertNo);
  }

  
  // private 
  function setupShaders() {

    // create shader
    vertID = gl.createShader(gl.VERTEX_SHADER);
    fragID = gl.createShader(gl.FRAGMENT_SHADER);

    // specify shader source
    gl.shaderSource(vertID, vertSrc);
    gl.shaderSource(fragID, fragSrc);

    // compile the shader
    gl.compileShader(vertID);
    gl.compileShader(fragID);

    var error = false;


    if(!gl.getShaderParameter(fragID, gl.COMPILE_STATUS)) {
      document.getElementById("code_frag_error").innerHTML = "invalid fragment shader : " + gl.getShaderInfoLog(fragID);
      document.getElementById("code_frag_error_div").style.display = "inline-block";
      document.getElementById("myWebGLCanvas").style.display = "none";
      error = true;

    }else{
      document.getElementById("code_frag_error").innerHTML = "";
      document.getElementById("code_frag_error_div").style.display = "none";
      document.getElementById("myWebGLCanvas").style.display = "inline-block";
    }
    
    if(error) return;
    
    // create program and attach shaders
    progID = gl.createProgram();
    gl.attachShader(progID, vertID);
    gl.attachShader(progID, fragID);

    // link the program
    gl.linkProgram(progID);
    if (!gl.getProgramParameter(progID, gl.LINK_STATUS)) {
      alert(gl.getProgramInfoLog(progID));
      return;
    }
    
    // retrieve the location of the IN variables of the vertex shader
    vertexLoc = gl.getAttribLocation(progID,"inputPosition");
    texCoordLoc =  gl.getAttribLocation(progID,"inputTexCoord");
    normalLoc = gl.getAttribLocation(progID, "inputNormal");
    
    // retrieve the location of the UNIFORM variables of the shader
    projectionLoc = gl.getUniformLocation(progID, "projection");
    modelviewLoc = gl.getUniformLocation(progID, "modelview");
    normalMatrixLoc = gl.getUniformLocation(progID, "normalMat");
    modeLoc = gl.getUniformLocation(progID, "mode");
    lightPosLoc = gl.getUniformLocation(progID, "lightPos");
    lightVecLoc = gl.getUniformLocation(progID, "lightVec");
    attenuationLoc = gl.getUniformLocation(progID, "attenuationVal");

  }
  
  function mat4Identity(a) {
    // Adrian commented this out because he doesn't understand it??? Here `a`
    // is a `Float32Array`, so you can't change its length...
    // a.length = 16;
    for (var i = 0; i < 16; ++i) a[i] = 0.0;
    for (var i = 0; i < 4; ++i) a[i + i * 4] = 1.0;
  }

  function mat4Perspective(a, fov, aspect, zNear, zFar) {
    var f = 1.0 / Math.tan (fov/2.0 * (Math.PI / 180.0));
    mat4Identity(a);
    a[0] = f / aspect;
    a[1 * 4 + 1] = f;
    a[2 * 4 + 2] = (zFar + zNear)  / (zNear - zFar);
    a[3 * 4 + 2] = (2.0 * zFar * zNear) / (zNear - zFar);
    a[2 * 4 + 3] = -1.0;
    a[3 * 4 + 3] = 0.0;
  }
  
  function mat4Transpose(a, transposed) {
    var t = 0;
    for (var i = 0; i < 4; ++i) {
      for (var j = 0; j < 4; ++j) {
        transposed[t++] = a[j * 4 + i];
      }
    }
  }

  function mat4Invert(m, inverse) {
    var inv = new Float32Array(16);
    inv[0] = m[5]*m[10]*m[15]-m[5]*m[11]*m[14]-m[9]*m[6]*m[15]+
             m[9]*m[7]*m[14]+m[13]*m[6]*m[11]-m[13]*m[7]*m[10];
    inv[4] = -m[4]*m[10]*m[15]+m[4]*m[11]*m[14]+m[8]*m[6]*m[15]-
             m[8]*m[7]*m[14]-m[12]*m[6]*m[11]+m[12]*m[7]*m[10];
    inv[8] = m[4]*m[9]*m[15]-m[4]*m[11]*m[13]-m[8]*m[5]*m[15]+
             m[8]*m[7]*m[13]+m[12]*m[5]*m[11]-m[12]*m[7]*m[9];
    inv[12]= -m[4]*m[9]*m[14]+m[4]*m[10]*m[13]+m[8]*m[5]*m[14]-
             m[8]*m[6]*m[13]-m[12]*m[5]*m[10]+m[12]*m[6]*m[9];
    inv[1] = -m[1]*m[10]*m[15]+m[1]*m[11]*m[14]+m[9]*m[2]*m[15]-
             m[9]*m[3]*m[14]-m[13]*m[2]*m[11]+m[13]*m[3]*m[10];
    inv[5] = m[0]*m[10]*m[15]-m[0]*m[11]*m[14]-m[8]*m[2]*m[15]+
             m[8]*m[3]*m[14]+m[12]*m[2]*m[11]-m[12]*m[3]*m[10];
    inv[9] = -m[0]*m[9]*m[15]+m[0]*m[11]*m[13]+m[8]*m[1]*m[15]-
             m[8]*m[3]*m[13]-m[12]*m[1]*m[11]+m[12]*m[3]*m[9];
    inv[13]= m[0]*m[9]*m[14]-m[0]*m[10]*m[13]-m[8]*m[1]*m[14]+
             m[8]*m[2]*m[13]+m[12]*m[1]*m[10]-m[12]*m[2]*m[9];
    inv[2] = m[1]*m[6]*m[15]-m[1]*m[7]*m[14]-m[5]*m[2]*m[15]+
             m[5]*m[3]*m[14]+m[13]*m[2]*m[7]-m[13]*m[3]*m[6];
    inv[6] = -m[0]*m[6]*m[15]+m[0]*m[7]*m[14]+m[4]*m[2]*m[15]-
             m[4]*m[3]*m[14]-m[12]*m[2]*m[7]+m[12]*m[3]*m[6];
    inv[10]= m[0]*m[5]*m[15]-m[0]*m[7]*m[13]-m[4]*m[1]*m[15]+
             m[4]*m[3]*m[13]+m[12]*m[1]*m[7]-m[12]*m[3]*m[5];
    inv[14]= -m[0]*m[5]*m[14]+m[0]*m[6]*m[13]+m[4]*m[1]*m[14]-
             m[4]*m[2]*m[13]-m[12]*m[1]*m[6]+m[12]*m[2]*m[5];
    inv[3] = -m[1]*m[6]*m[11]+m[1]*m[7]*m[10]+m[5]*m[2]*m[11]-
             m[5]*m[3]*m[10]-m[9]*m[2]*m[7]+m[9]*m[3]*m[6];
    inv[7] = m[0]*m[6]*m[11]-m[0]*m[7]*m[10]-m[4]*m[2]*m[11]+
             m[4]*m[3]*m[10]+m[8]*m[2]*m[7]-m[8]*m[3]*m[6];
    inv[11]= -m[0]*m[5]*m[11]+m[0]*m[7]*m[9]+m[4]*m[1]*m[11]-
             m[4]*m[3]*m[9]-m[8]*m[1]*m[7]+m[8]*m[3]*m[5];
    inv[15]= m[0]*m[5]*m[10]-m[0]*m[6]*m[9]-m[4]*m[1]*m[10]+
             m[4]*m[2]*m[9]+m[8]*m[1]*m[6]-m[8]*m[2]*m[5];

    var det = m[0]*inv[0]+m[1]*inv[4]+m[2]*inv[8]+m[3]*inv[12];
    if (det == 0) return false;
    det = 1.0 / det;
    for (var i = 0; i < 16; i++) inverse[i] = inv[i] * det;
    return true;
  }
} 

