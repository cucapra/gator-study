<script>
  import { onMount, onDestroy } from 'svelte';
  import { shaderTexts, gatorToGLSL } from '../modules/utils';
  import * as glHelpers from '../modules/glHelpers';
  import Renderer from '../modules/renderer';
  import teapotObj from '../../assets/models/teapot.obj';
  import cubeObj from '../../assets/models/cube.obj';

  // If this component is initialized with the gator prob as `false`,
  // it will just act as vanilla webgl code
  export let gator = true;

  // These are controlled by svelte
  let canvas: HTMLCanvasElement;
  let status = '';
  let selected: string;

  // misc stuff
  const models = {
    teapot: glHelpers.parseOBJ(teapotObj),
    cube: glHelpers.parseOBJ(cubeObj),
  }
  let renderer: Renderer;
  let shaders = {
    frag: { text: '', last: '', changed: false },
    vert: { text: '', last: '', changed: false },
  }

  // Run on component start, not in SSR
  if (window.routify.inBrowser) {
    onMount(async () => {
      // Initialize the GL context. `canvas` is only defined here
      renderer = new Renderer(canvas);
      if (gator) {
        shaders.frag.last = await gatorToGLSL('FRAGMENT', shaders.frag.text);
        shaders.vert.last = await gatorToGLSL('VERTEX', shaders.vert.text);
      } else {
        shaders.frag.last = shaders.frag.text;
        shaders.vert.last = shaders.vert.text;
      }
      shaders.frag.changed = false;
      shaders.vert.changed = false;
      renderer.compile(shaders.frag.last, shaders.vert.last, models[selected]);
      renderer.startRender();
    });
  }

  // Run to activate new shader code
  const compile = async () => {
    renderer.stopRender();
    try {
      if (gator) {
        if (shaders.frag.changed) {
          shaders.frag.last = await gatorToGLSL('FRAGMENT', shaders.frag.text);
          shaders.frag.changed = false;
        }
        if (shaders.vert.changed) {
          shaders.vert.last = await gatorToGLSL('VERTEX', shaders.vert.text);
          shaders.vert.changed = false;
        }
      } else {
        shaders.frag.last = shaders.frag.text;
        shaders.vert.last = shaders.vert.text;
      }
      renderer.compile(shaders.frag.last, shaders.vert.last, models[selected]);
    } catch (e) {
      status = e;
      return;
    }
    renderer.startRender();
    status = 'success';
  };

  // `$:` makes svelte rerun this whenever something on the line (i.e., models[selected]) changes
  $: models[selected] && compile();

  // Whenever the shaderTexts store updates, this also updates the 
  // fragText and vertText variables. I'm supposed to be able to just
  // do something like `{frag, vert} = $shaderTexts` instead of
  // the whole block below, but that's not working for some reason.
  const unsubscribe = shaderTexts.subscribe(text => {
    if (shaders.frag.text !== text.frag) {
      shaders.frag.text = text.frag;
      shaders.frag.changed = true;
    }
    if (shaders.vert.text !== text.vert) {
      shaders.vert.text = text.vert;
      shaders.vert.changed = true;
    }
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
    padding: 0.56em;
    border: 0;
    background-color: #3282b8;
    color: white;
    &:hover {
      background-color: darken(#3282b8, 10%);
      cursor: pointer;
    }
  }
  select {
    border-radius: 0.2rem;
    padding: 0.5em 1.5em 0.5em 0.5em;
    border: 0;
    appearance: none;
    background: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>') 100% 50% no-repeat white;
  }
</style>

<div>{status}</div>

<button on:click={compile}>Compile</button>
<select bind:value={selected}>
  {#each Object.keys(models) as name}
    <option value={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
  {/each}
</select>
<canvas bind:this={canvas}></canvas>
