<script>
  import { goto } from '@roxi/routify';
  import { user } from '../../modules/utils';
</script>

{#if $user.id}
  <slot />
{:else}
  {$goto('/')}
{/if}
