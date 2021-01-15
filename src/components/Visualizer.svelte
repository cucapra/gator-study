<script>
  import { onMount, onDestroy } from 'svelte';
  import { shaderTexts, gatorToGLSL } from '../modules/utils';
  import * as glHelpers from '../modules/glHelpers';
  import Renderer from '../modules/renderer';
  import teapotObj from '../../assets/models/teapot.obj';

  // If this component is initialized with the gator prob as `false`,
  // it will just act as vanilla webgl code
  export let gator = true;

  // These are controlled by svelte
  let canvas: HTMLCanvasElement;
  let status = '';
  let fragText: string;
  let vertText: string;

  // misc gl stuff
  const teapotModel = glHelpers.parseOBJ(teapotObj);
  let renderer: Renderer;

  // Run on component start, not in SSR
  if (window.routify.inBrowser) {
    onMount(async () => {
      // Initialize the GL context. `canvas` is only defined here
      renderer = new Renderer(canvas);
      let frag: string;
      let vert: string;
      if (gator) {
        ({ frag, vert } = await gatorToGLSL({frag: fragText, vert: vertText}));
      } else {
        frag = fragText;
        vert = vertText;
      }
      renderer.compile(frag, vert, teapotModel);
      renderer.startRender();
    });
  }

  // Run to activate new shader code
  const compile = async () => {
    renderer.stopRender();
    try {
      let frag: string;
      let vert: string;
      if (gator) {
        ({ frag, vert } = await gatorToGLSL({frag: fragText, vert: vertText}));
      } else {
        frag = fragText;
        vert = vertText;
      }
      renderer.compile(frag, vert, teapotModel);
    } catch (e) {
      status = e;
      return;
    }
    renderer.startRender();
    status = 'success';
  };

  // Whenever the shaderTexts store updates, this also updates the 
  // fragText and vertText variables. I'm supposed to be able to just
  // do something like `{frag, vert} = $shaderTexts` instead of
  // the whole block below, but that's not working for some reason.
  const unsubscribe = shaderTexts.subscribe(text => {
    fragText = text.frag;
    vertText = text.vert;
  });
  onDestroy(unsubscribe);
</script>

<style>
  canvas {
    display: block;
    width: 100%;
  }
  button {
    border-radius: 0.2rem;
    padding: 0.5em;
    border: 0;
  }
</style>

<button on:click={compile}>Compile</button>
<span>{status}</span>
<canvas bind:this={canvas}></canvas>

