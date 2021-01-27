<script>
  import Markdown from '../../components/Markdown.svelte';
  import Visualizer from '../../components/Visualizer.svelte';
  import Editor from '../../components/CodeMirror.svelte';
  import { shaderTexts } from '../../modules/utils';

  const fragCallback = (cm: CodeMirror.Editor) => {
    shaderTexts.update(n => ({ ...n, frag: cm.getValue() }));
  };

  shaderTexts.update(n => ({ ...n, vert:
`#"precision mediump float;";

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
}`
  }));
</script>

<Markdown>
## A graphics programming tutorial
How _neat_. Look at that **code**!
GLSL looks like this:
```
uniform vec3 stuff;
void main() {'{'}
  gl_Position = stuff;
{'}'}
```
</Markdown>

<Editor value={`
#"precision mediump float;";

type vec4 is float[4];

void main() {
    vec4 color = [1., 0.4, 0.25, 1.];
    vec4 gl_FragColor = color;
}
`} onUpdate={fragCallback}/>

<Visualizer gator={true}/>
