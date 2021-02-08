<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage1" next="stage3">
<span slot="text">
The Fragment Shader requires you to assign a variable, `gl_FragColor`, a vector inside of the main function. This vector combines an red-green-blue (rgb) value and an opacity value as so:
```
gl_FragColor = vec4(red, green, blue, opacity)
```
It sets the color and opacity for each pixel between the vertices. Here we assign the color to red with full opacity using `vec4(1.0, 0.0,0.0,1.0)`. Note that each float in the vector must be between 0.0 and 1.0, indicating the “amount” of each color.

Now it’s your turn! Try editing the code to change the shape from red to blue. 
</span>

<span slot="code">
precision mediump float;

const vec3 ambientColor = vec3(1.0, 0.0, 0.0);

void main() {'{'}
  gl_FragColor = vec4(ambientColor, 1.0);
{'}'}
</span>
</Tutorial>
