<script lang="ts">
  import { onMount } from 'svelte';

  import WikiItem from '../WikiItem.svelte';
  import type { RandomPageResponse } from '../Wikipedia/types';
  import {
    debugMode,
    localStorageFavoriteKey,
    localStorageHistoryKey,
    localStoragePrefix,
    throttleTimeInMilliseconds,
    triggerFetchPercentageThreshold,
  } from '../constants';
  import { favoriteList, historyList } from '../stores';
  import type { WikiListItem } from '../types';

  type Props = {
    randomPageResponses: RandomPageResponse[];
    loadNewPages: () => void;
  };

  const { randomPageResponses, loadNewPages }: Props = $props();

  let lastExecuted: Date;
  function addWikiToHistoryLocalStorage(item: WikiListItem) {
    historyList.update((value) => {
      const updatedList = [...value, item];
      localStorage.setItem(
        localStoragePrefix + localStorageHistoryKey,
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  }

  function addWikiToFavoritesLocalStorage(
    item: WikiListItem,
    isFavorite: boolean
  ) {
    if (!isFavorite) {
      favoriteList.update((value) => {
        const updatedList = value.filter((x) => x.title !== item.title);
        localStorage.setItem(
          localStoragePrefix + localStorageFavoriteKey,
          JSON.stringify(updatedList)
        );
        return updatedList;
      });
      return;
    }

    favoriteList.update((value) => {
      const updatedList = [...value, item];
      localStorage.setItem(
        localStoragePrefix + localStorageFavoriteKey,
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
  }
  let container: HTMLElement;

  onMount(() => {
    lastExecuted = new Date();

    function scrollAction(event: Event): void {
      const target = event.target as HTMLElement;
      const totalHeight = target.scrollHeight;
      const scrollHeight = target.scrollTop;

      if (
        scrollHeight / totalHeight > triggerFetchPercentageThreshold &&
        Date.now() - lastExecuted.getTime() > throttleTimeInMilliseconds
      ) {
        lastExecuted = new Date();
        loadNewPages();
      }

      if (debugMode) {
        console.log(totalHeight);
        console.log(scrollHeight);
      }
    }

    container = document.getElementsByTagName('main')?.[0];
    container.addEventListener('scroll', scrollAction);

    return () => container.removeEventListener('scroll', scrollAction);
  });
</script>

<main class="h-dvh h-screen snap-y snap-mandatory overflow-y-scroll">
  {#each randomPageResponses as page}
    <WikiItem
      backgroundUrl={page.originalimage.source}
      wikiUrl={page.content_urls.desktop.page}
      title={page.title}
      excerpt={page.extract}
      onVisit={addWikiToHistoryLocalStorage}
      onFavorite={addWikiToFavoritesLocalStorage}
    />
  {/each}
</main>
