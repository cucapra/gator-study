import * as glHelpers from './glHelpers';
import type { Model } from './glHelpers';
import { mat4 } from 'gl-matrix';

// TypeScript by default has `gl.canvas` be a union,
// which doesn't mesh super well with some of the calls here,
// so I'm redeclaring it.
declare global {
  interface WebGLRenderingContext {
    canvas: HTMLCanvasElement;
  }
}

interface Attribute {
  location: number;
  buffer: WebGLBuffer;
}
interface Attributes {
  position?: Attribute;
  normal?: Attribute;
}
interface Uniforms {
  projectionMatrix: WebGLUniformLocation;
  viewMatrix: WebGLUniformLocation;
  modelMatrix: WebGLUniformLocation;
}

class Renderer {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: Uniforms;
  modelLength: number;
  frame: number;
  attributes: Attributes = {};
  lastTime = performance.now();
  projectionMatrix = mat4.create();
  viewMatrix = mat4.create();
  modelMatrix = mat4.create();
  mouseDown = false;

  constructor(canvas: HTMLCanvasElement) {
    // Create our GL context
    this.gl = canvas.getContext('webgl');

    // Set up matrices
    // Perspective
    mat4.perspective(this.projectionMatrix, (45 * Math.PI / 180), canvas.clientWidth / canvas.clientHeight, 1, 20);
    // view
    mat4.lookAt(this.viewMatrix, [1, 4, 5], [0, 0, 0], [0, 1, 0]);

    // Set necessary event listeners
    canvas.addEventListener('wheel', e => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const change = 1 + e.deltaY * 0.01;
        mat4.scale(this.viewMatrix, this.viewMatrix, [change, change, change]);
      }
    });

    canvas.addEventListener('mousedown', e => {
      this.mouseDown = true;
    });

    // We want this to be on document because mouse going up anywhere should count
    document.addEventListener('mouseup', e => {
      this.mouseDown = false;
    });
    canvas.addEventListener('mousemove', e => {
      if (this.mouseDown) {
        mat4.rotateY(this.viewMatrix, this.viewMatrix, e.movementX * 0.01);
        mat4.rotateX(this.viewMatrix, this.viewMatrix, e.movementY * 0.01);
      }
    });
  }

  // Adds an attribute if it is called for in the GLSL, and is non-empty
  maybeAddAttr(name: string, source: number[]) {
    if (source.length) {
      const location = this.gl.getAttribLocation(this.program, name);
      if (location !== -1) {
        this.attributes[name] = {
          location,
          buffer: this.gl.createBuffer(),
        };
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[name].buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(source), this.gl.STATIC_DRAW);
      }
    }
  }

  // Creates a new program in the same GL context with a new model and shaders
  // Assumes model entries length is consistent
  compile(fragText: string, vertText: string, model: Model) {
    // Delete the old program
    this.gl.deleteProgram(this.program);

    // Create new program
    this.program = glHelpers.createProgram(this.gl, vertText, fragText);

    this.modelLength = model.length;

    // Sets attributes up if they exist in the shader code and model
    this.maybeAddAttr('position', model.positions);
    this.maybeAddAttr('normal', model.normals);

    // Enable uniforms
    this.uniforms = {
      projectionMatrix: this.gl.getUniformLocation(this.program, 'projectionMatrix'),
      modelMatrix: this.gl.getUniformLocation(this.program, 'modelMatrix'),
      viewMatrix: this.gl.getUniformLocation(this.program, 'viewMatrix'),
    };
  }

  // Starts a render loop
  startRender() {
    this.frame = requestAnimationFrame(this.render);
  }

  // Stops it
  stopRender() {
    cancelAnimationFrame(this.frame);
  }

  // Arrow function so that `this` works
  render = (time: number) => {
    // Calculate timestep, which requestAnimationFrame gives us
    const passed = (time - this.lastTime) * 0.001;
    this.lastTime = time;

    // Resize canvas
    glHelpers.resizeCanvas(this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Enable stuff
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    // Use current program
    this.gl.useProgram(this.program);
    
    // Iterates over attributes we previously defined, and sets them up
    // Assumes things such as size and type which can be refined later if required
    for (const attr of Object.values(this.attributes)) {
      this.gl.enableVertexAttribArray(attr.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attr.buffer);
      this.gl.vertexAttribPointer(attr.location, 3, this.gl.FLOAT, false, 0, 0);
    }
    
    // Set up uniform matrices
    this.gl.uniformMatrix4fv(this.uniforms.projectionMatrix, false, this.projectionMatrix);
    this.gl.uniformMatrix4fv(this.uniforms.viewMatrix, false, this.viewMatrix);
    this.gl.uniformMatrix4fv(this.uniforms.modelMatrix, false, this.modelMatrix);

    // Draw it
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.modelLength / 3);

    // AND DO IT AGAIN!!
    this.frame = requestAnimationFrame(this.render);
  }
}

export default Renderer;

