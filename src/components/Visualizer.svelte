<script>
  import { onMount, onDestroy } from 'svelte';
  import { shaderTexts, gatorToGLSL, sendData } from '../modules/utils';
  import * as glHelpers from '../modules/glHelpers';
  import Renderer from '../modules/renderer';
  import teapotObj from '../../assets/models/teapot.obj';
  import cubeObj from '../../assets/models/cube.obj';

  // If this component is initialized with the gator prob as `false`,
  // it will just act as vanilla webgl code
  export let gator = true;
  // Whether or not to collect data
  export let report = true;

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
    frag: { text: '', last: '', changed: true },
    vert: { text: '', last: '', changed: true },
  }

  // Run on component start, not in SSR
  if (window.routify.inBrowser) {
    onMount(async () => {
      // Initialize the GL context. `canvas` is only defined here
      renderer = new Renderer(canvas);
    });
  }

  // Run to activate new shader code
  const compile = async () => {
    renderer && renderer.stopRender();
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
      renderer.startRender();
      renderer.compile(shaders.frag.last, shaders.vert.last, models[selected]);
      if (report) sendData('temp', await renderer.getImage(), shaders.frag.last);
      status = 'success';
    } catch (e) {
      renderer.clear();
      if (report) sendData('temp', new Blob([]), shaders.frag.last);
      status = e;
    }
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
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translate(0, -50%);
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
  h4 {
    margin-bottom: 0.5em;
  }
  p {
    margin: 0.5em 0;
  }
</style>


<button on:click={compile}>Compile</button>
<select bind:value={selected}>
  {#each Object.keys(models) as name}
    <option value={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
  {/each}
</select>
<div>
  <h4>Status:</h4>
  {#if status === 'success'}
    <p style="color:lightgreen;">{status}</p>
  {:else}
    <p style="color:red;">{status}</p>
  {/if}
</div>
<canvas bind:this={canvas}></canvas>

