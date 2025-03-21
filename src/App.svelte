<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import Header from './lib/Header.svelte';
  import WikiItem from './lib/WikiItem.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';
  import {
    batchLoadingCount,
    debugMode,
    localStorageFavoriteKey,
    localStorageHistoryKey,
    localStoragePrefix,
    throttleTimeInMilliseconds,
    triggerFetchPercentageThreshold,
  } from './lib/constants';
  import { placeholderResponse } from './lib/data';
  import { favoriteList, historyList } from './lib/stores';
  import type { WikiListItem } from './lib/types';
  import Favorite from './lib/views/Favorite.svelte';

  let stored: RandomPageResponse[] = $state([placeholderResponse]);

  let container: HTMLElement;
  let lastExecuted: Date;

  let hash = $state(window.location.hash);
  let storeSubscriptions: Unsubscriber[] = [];

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

  onMount(() => {
    async function execute() {
      lastExecuted = new Date();
      const tasks: Promise<Response>[] = [];

      for (let i = 0; i < batchLoadingCount; i++) {
        tasks.push(
          fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
        );
      }

      const results = await Promise.all(tasks);

      const pages = results.map((x) => x.json() as Promise<RandomPageResponse>);

      const responses = await Promise.all(pages);

      stored = [...stored, ...responses];
    }

    execute();

    container = document.getElementsByTagName('main')?.[0];

    window.addEventListener('hashchange', () => {
      hash = window.location.hash;
    });

    if (debugMode) {
      // unsub these
      storeSubscriptions.push(
        historyList.subscribe((value) => {
          console.log('from store for history');
          console.log(value);
        })
      );

      storeSubscriptions.push(
        favoriteList.subscribe((value) => {
          console.log('from store for favorites');
          console.log(value);
        })
      );
    }

    function handler(event: Event) {
      const target = event.target as HTMLElement;
      const totalHeight = target.scrollHeight;
      const scrollHeight = target.scrollTop;

      if (
        scrollHeight / totalHeight > triggerFetchPercentageThreshold &&
        Date.now() - lastExecuted.getTime() > throttleTimeInMilliseconds
      ) {
        execute();
      }

      if (debugMode) {
        console.log(totalHeight);
        console.log(scrollHeight);
      }
    }

    container.addEventListener('scroll', handler);

    return () => {
      container.removeEventListener('scroll', handler);

      storeSubscriptions.forEach((x) => x());
      storeSubscriptions = [];
    };
  });

  onDestroy(() => {});
</script>

<Header />

{#if hash == ''}
  <main class="h-dvh h-screen snap-y snap-mandatory overflow-y-scroll">
    {#each stored as page}
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
{/if}

{#if hash == '#favorites'}
  <Favorite />
{/if}
