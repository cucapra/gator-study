<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage0" next="stage2">
<span slot="text">
Today you will be coding a fragment shader. Each model is constructed by a list of vertex coordinates. The fragment shader takes care of how the pixels between the vertices look. The vertices connect to form polygon shaped planes, and the way each plane is colored describes how light is reflecting off of that surface.
</span>

<span slot="code">
precision mediump float;

const vec3 flatColor = vec3(0.5, 0.0, 0.0);

void main() {'{'}
  gl_FragColor = vec4(flatColor, 1.0);
{'}'}
</span>
</Tutorial>
