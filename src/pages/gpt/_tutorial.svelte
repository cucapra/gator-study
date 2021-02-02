<script>
  import Markdown from '../../components/Markdown.svelte';
  import Visualizer from '../../components/Visualizer.svelte';
  import Editor from '../../components/CodeMirror.svelte';
  import { shaderTexts } from '../../modules/utils';
  import { url } from '@roxi/routify';

  export let next = '';
  export let prev = '';

  const fragCallback = (cm: CodeMirror.Editor) => {
    shaderTexts.update(n => ({ ...n, frag: cm.getValue() }));
  };

  shaderTexts.update(n => ({ ...n, vert:
`
attribute vec3 position;

uniform mat4 projectionMatrix, modelMatrix, viewMatrix;

void main(){
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
}
`
}));
</script>

<style>
  main {
    display: grid;
    grid-template:
      "title title title" auto
      "text editor viz" 1fr
      "nav editor viz" auto
      / 1fr 1fr 1fr;
    height: 100vh;
    grid-column-gap: 1rem;
    margin: 0 1rem;

    h1 {
      grid-area: title;
    }

    #viz {
      position: relative;
      grid-area: viz;
    }

    #editor {
      grid-area: editor;
    }

    #nav {
      grid-area: nav;

      svg {
        max-height: 1.5rem;
        fill: white;
        vertical-align: middle;
      }
      .prev, .next {
        padding: 0.6rem 1.1rem 0.6rem 0.9rem;
      }
      .prev {
        float: left;
      }
      .next {
        float: right;
        transform: scaleX(-1);
      }
    }
  }
</style>

<main>
  <h1>Graphics Programming Tutorial</h1>
  <span id="text">
    <Markdown>
      <slot name="text" />
    </Markdown>
  </span>
  <div id="nav">
    {#if prev}
      <a href={$url(`./${prev}`)} class="prev clickable">
        <svg viewbox="0 0 60 100">
          <path class="arrow" d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z" />
        </svg>
      </a>
    {/if}
    {#if next}
      <a href={$url(`./${next}`)} class="next clickable">
        <svg viewbox="0 0 60 100">
          <path class="arrow" d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z" />
        </svg>
      </a>
    {/if}
  </div>

  <span id="editor">
    <Editor onUpdate={fragCallback}>
      <slot name="code" />
    </Editor>
  </span>

  <span id="viz">
    <Visualizer gator={false}/>
  </span>
</main>
