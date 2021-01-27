<script>
  import { goto } from '@roxi/routify';
</script>

{#if sessionStorage.getItem('id')}
  <slot />
{:else}
  {$goto('/')}
{/if}
