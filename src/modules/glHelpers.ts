// Selected + modified works from WebGLFundamentals webglUtils,
// as well as others

function createShader(gl: WebGLRenderingContext, sourceCode: string, type: number): WebGLShader {
  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  // If we get an error, delete the shader and throw it
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    const name = (type === gl.VERTEX_SHADER) ? 'VERTEX' : 'FRAGMENT';
    throw `${name} COMPILATION ${info}`;
  }
  return shader;
};

function createProgram(gl: WebGLRenderingContext, vertText: string, fragText: string): WebGLProgram {
  const shaders = [];
  const fragShader = createShader(gl, fragText, gl.FRAGMENT_SHADER);
  const vertShader = createShader(gl, vertText, gl.VERTEX_SHADER);
  const program = gl.createProgram();
  gl.attachShader(program, fragShader);
  gl.attachShader(program, vertShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw 'LINKING ERROR: ' + info;
  }
  gl.detachShader(program, fragShader);
  gl.detachShader(program, vertShader);
  gl.deleteShader(fragShader);
  gl.deleteShader(vertShader);
  return program;
};

export interface Model {
  positions: number[];
  normals: number[];
  length: number;
}

// Simplified version of WebGLFundamental's parser. Not sure if this should be the final form
function parseOBJ(text: string) : Model {
  const objPositions = [[0, 0, 0]];
  const objNormals = [[0, 0, 0]];

  const objVertexData = [
    objPositions,
    objNormals,
  ];

  let webglVertexData = [
    [],   // positions
    [],   // normals
  ];

  function addVertex(vert) {
    const ptn = vert.split('//');
    ptn.forEach((objIndexStr, i) => {
      if (!objIndexStr) {
        return;
      }
      const objIndex = parseInt(objIndexStr);
      const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      webglVertexData[i].push(...objVertexData[i][index]);
    });
  }

  const keywords = {
    v(parts) {
      objPositions.push(parts.map(parseFloat));
    },
    vn(parts) {
      objNormals.push(parts.map(parseFloat));
    },
    f(parts) {
      const numTriangles = parts.length - 2;
      for (let tri = 0; tri < numTriangles; ++tri) {
        addVertex(parts[0]);
        addVertex(parts[tri + 1]);
        addVertex(parts[tri + 2]);
      }
    },
  };

  const keywordRE = /(\w*)(?: )*(.*)/;
  const lines = text.split('\n');
  for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
    const line = lines[lineNo].trim();
    if (line === '' || line.startsWith('#')) {
      continue;
    }
    const m = keywordRE.exec(line);
    if (!m) {
      continue;
    }
    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];
    if (!handler) {
      console.warn('unhandled keyword:', keyword);
      continue;
    }
    handler(parts, unparsedArgs);
  }

  const positions = webglVertexData[0];
  const normals = webglVertexData[1];
  const posLength = positions.length;
  const normLength = normals.length;
  if (posLength !== normLength) {
    console.warn('not as many normals as positions which is sort of weird?');
  } 
  return {
    positions,
    normals,
    length: posLength,
  };
};

function resizeCanvas(canvas: HTMLCanvasElement): boolean {
  const width = canvas.clientWidth | 0;
  const height = canvas.clientHeight | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

export { 
  parseOBJ,
  createProgram,
  resizeCanvas,
};

