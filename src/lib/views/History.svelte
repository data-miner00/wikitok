<script lang="ts">
  import { onMount } from 'svelte';

  import WikiItem from '../WikiItem.svelte';
  import { historyList } from '../stores';
  import type { WikiList } from '../types';

  let storedHistory: WikiList = $state<WikiList>([]);

  onMount(() => {
    historyList.subscribe((value) => {
      storedHistory = value;
    });
  });
</script>

<main class="h-dvh h-screen snap-y snap-mandatory overflow-y-scroll">
  {#each storedHistory as page}
    <WikiItem
      backgroundUrl={page.thumbnail}
      wikiUrl={page.url}
      title={page.title}
      excerpt={page.extract}
      onVisit={() => {}}
      onFavorite={() => {}}
    />
  {:else}
    <div class="text-center bg-black grid place-items-center h-full text-white">
      <p class="block w-fit text-2xl uppercase">No history yet</p>
    </div>
  {/each}
</main>
