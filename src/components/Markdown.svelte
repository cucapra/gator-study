<script>
  // This is the most minimal MD parser
  import snarkdown from 'snarkdown';
  import { onMount } from 'svelte';

  let wrapper: HTMLElement;
  let content = '';

  onMount(() => {
    content = wrapper.textContent;
  });
</script>

<span bind:this={wrapper} hidden><slot /></span>

{@html snarkdown(content)}

