<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial next="stage1">
<span slot="text">
Hello! Welcome to our GLSL tutorial. Today you will learn how to program using the GLSL language. GLSL is a language that gives programmers the ability to modify pipeline shaders. A shader is what provides the code that you will write to the graphics card, telling it how to render each pixel. These shaders control the lighting and shading of a 3D model. Knowing how to program these shaders thus gives you the ability to alter lighting and shading, and even create special effects.

This console is made of three main components: the tutorial window; which you are reading from now, a text editor, which you will use to program; and a visualizer which will display the rendered model. You can switch between tutorial steps by using the left and right arrows at the bottom of this component. To see how your code affects the model, click the compile button. If you make a mistake and need to reset your code, click the reset button. If your code contains errors, the visualizer will display the error message after compilation. You can change your view of the model by clicking and dragging the model to turn it. You can zoom in and out of the model by two finger scrolling on it or scrolling with the mousewheel. You can also switch models through the drop down menu. 

Now that you know the basics, let's get into the tutorial! Proceed to the next step to begin.
</span>

<span slot="code">
precision mediump float;

const vec3 flatColor = vec3(0.5, 0.0, 0.0);

void main() {'{'}
  gl_FragColor = vec4(flatColor, 1.0);
{'}'}
</span>
</Tutorial>
