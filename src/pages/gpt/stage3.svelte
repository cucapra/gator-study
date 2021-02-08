<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage2" next="stage4">
<span slot="text">
Nice Job, you’ve learned how to create ambient lighting! Ambient lighting is uniform on all points of surface, and disregards the light source. However, ambient lighting alone does not make the object look three dimensional. Lets learn how to do a basic diffuse lighting model which will make the object look much more realistic!
</span>

<span slot="code">
precision mediump float;

const vec3 ambientColor = vec3(1.0, 0.0, 0.0);

void main() {'{'}
  gl_FragColor = vec4(ambientColor, 1.0);
{'}'}
</span>
</Tutorial>
