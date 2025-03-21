<script lang="ts">
  import { onMount } from 'svelte';

  import Header from './lib/Header.svelte';
  import WikiItem from './lib/WikiItem.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';
  import {
    batchLoadingCount,
    debugMode,
    localStorageHistoryKey,
    localStoragePrefix,
    throttleTimeInMilliseconds,
    triggerFetchPercentageThreshold,
  } from './lib/constants';
  import { placeholderResponse } from './lib/data';
  import { historyList } from './lib/stores';
  import type { WikiListItem } from './lib/types';

  let stored: RandomPageResponse[] = [placeholderResponse];

  let container: HTMLElement;
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
      if (debugMode) console.log(stored);
    }

    execute();

    container = document.getElementsByTagName('main')?.[0];

    if (debugMode) {
      historyList.subscribe((value) => {
        console.log('from store');
        console.log(value);
      });
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
        if (debugMode) console.log('hello debounce');
      }

      if (debugMode) {
        console.log(totalHeight);
        console.log(scrollHeight);
      }
    }

    container.addEventListener('scroll', handler);

    return () => container.removeEventListener('scroll', handler);
  });
</script>

<Header />

<main class="h-dvh h-screen snap-y snap-mandatory overflow-y-scroll">
  {#each stored as page}
    <WikiItem
      backgroundUrl={page.originalimage.source}
      wikiUrl={page.content_urls.desktop.page}
      title={page.title}
      excerpt={page.extract}
      onVisit={addWikiToHistoryLocalStorage}
    />
  {/each}
</main>
