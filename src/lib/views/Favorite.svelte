<script lang="ts">
  import WikiItem from '../WikiItem.svelte';
  import { localStorageFavoriteKey, localStoragePrefix } from '../constants';
  import { favoriteList } from '../stores';
  import type { WikiListItem } from '../types';

  let stored = $state<WikiListItem[]>([]);

  favoriteList.subscribe((value) => {
    stored = value;
  });

  function removeFromFavorite(title: string) {
    favoriteList.update((value) => {
      const updatedList = value.filter((x) => x.title !== title);
      localStorage.setItem(
        localStoragePrefix + localStorageFavoriteKey,
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  }
</script>

<main class="h-dvh h-screen snap-y snap-mandatory overflow-y-scroll">
  {#each stored as page}
    <WikiItem
      backgroundUrl={page.thumbnail}
      wikiUrl={page.url}
      title={page.title}
      excerpt={page.extract}
      onVisit={() => {}}
      onFavorite={() => removeFromFavorite(page.title)}
      isFaved={true}
    />
  {:else}
    <div class="text-center bg-black grid place-items-center h-full text-white">
      <p class="block w-fit text-2xl uppercase">No favorites yet</p>
    </div>
  {/each}
</main>
