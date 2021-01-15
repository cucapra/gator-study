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

type vec4 is float[4];

void main() { 
    vec4 color = [1., 0.4, 0.25, 1.];
    vec4 gl_FragColor = color;
}
`} onUpdate={fragCallback}/>
</span>

<span id="vert">
<h3>Vertex shader</h3>
<Editor value={`
#"precision mediump float;";

type vec3 is float[3];
type vec4 is float[4];
type mat4 is float[4][4];

with mat4 T: declare T *(T m1, T m2);
with mat4 T: with vec4 U: declare U *(T m, U v);

declare vec4 vec4(vec3 v, float f);
declare vec3 vec3(vec4 v);

attribute vec3 position;
attribute vec3 normal;
varying vec3 vPosition;
varying vec3 vNormal;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {
  vNormal = normal;
  vPosition = position;
  vec4 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`} onUpdate={vertCallback}/>
</span>

<div id="prev">
  <Visualizer />
</div>
</div>

