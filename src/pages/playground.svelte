<script>
  import Editor from '../components/CodeMirror.svelte';
  import type CodeMirror from 'codemirror';
  import Visualizer from '../components/Visualizer.svelte';
  import { shaderTexts } from '../modules/utils';

  const fragCallback = (cm: CodeMirror.Editor) => {
    shaderTexts.update(n => ({ ...n, frag: cm.getValue() }));
  };

  const vertCallback = (cm: CodeMirror.Editor) => {
    shaderTexts.update(n => ({ ...n, vert: cm.getValue() }));
  };
</script>

<style>
  #playground-content {
    display: grid;
    grid-template: 
      "vert prev" 1fr
      "frag prev" 1fr
      / auto max(40%, 20rem);
    grid-gap: 1rem;

    #frag {
      grid-area: frag;
    }
    #vert {
      grid-area: vert;
    }
    #prev {
      grid-area: prev;
      align-self: center;
    }
  }
</style>

<h2>Playground</h2>

<div id="playground-content">
<span id="frag">
<h3>Fragment shader</h3>
<Editor value={`
#"precision mediump float;";

using "../glsl_defs.lgl";

// Reference Frame Declarations

frame model has dimension 3;
frame world has dimension 3;
frame camera has dimension 3;

varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

void main() {
    vec3 lightPos = [0., 1., 2.];
    vec3 ambient = [.1, 0., 0.];
    vec3 diffColor = [0.2, 0.8, 0.4];
    vec3 specColor = [1.0, 1.0, 1.0];

    vec3 worldPos = vec3(modelMatrix * vec4(-vPosition, 1.));
    vec3 worldNorm = vec3(modelMatrix * vec4(vNormal, 0.));

    vec3 lightDir = normalize(lightPos - worldPos);
    float lightWorldDot = dot(lightDir, worldNorm);
    float diffuse = max(lightWorldDot, 0.);

    vec3 camPos = vec3(viewMatrix*vec4(worldPos, 1.));

    vec3 reflectDir = vec3(viewMatrix*vec4(reflect(-lightDir, worldNorm), 0.));

    float specular = pow(max(dot(normalize(-camPos), reflectDir), 0.), 32.);
    gl_FragColor = vec4(ambient + diffuse * diffColor + specular * specColor, 1.);
}
`} onUpdate={fragCallback}/>
</span>

<span id="vert">
<h3>Vertex shader</h3>
<Editor value={`
#"precision mediump float;";

using "../glsl_defs.lgl";

attribute vec3 position;
attribute vec3 normal;

varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() {
  vNormal = normal;
  vPosition = position;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
}
`} onUpdate={vertCallback}/>
</span>

<div id="prev">
  <Visualizer />
</div>
</div>

