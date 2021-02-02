<script>
  // This is the most minimal MD parser
  import snarkdown from 'snarkdown';
  import { onMount } from 'svelte';

  let wrapper: HTMLElement;
  let content = '';

  function makeHTML(md: string): string {
    return md.split('\n\n').reduce((acc, cur) => acc + `<p>${snarkdown(cur)}</p>`, '');
  }

  onMount(() => {
    content = wrapper.textContent;
  });
</script>

<span bind:this={wrapper} hidden><slot /></span>

{@html makeHTML(content)}

