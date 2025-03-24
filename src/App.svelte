<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import Header from './lib/Header.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';
  import {
    batchLoadingCount,
    debugMode,
    localStorageLanguageKey,
    localStoragePrefix,
  } from './lib/constants';
  import { placeholderResponse } from './lib/data';
  import { favoriteList, historyList } from './lib/stores';
  import type { Language } from './lib/types';
  import Favorite from './lib/views/Favorite.svelte';
  import History from './lib/views/History.svelte';
  import Home from './lib/views/Home.svelte';

  let language =
    (localStorage.getItem(
      localStoragePrefix + localStorageLanguageKey
    ) as Language) || 'en';
  let stored: RandomPageResponse[] = $state([placeholderResponse]);

  let hash = $state(window.location.hash);
  let storeSubscriptions: Unsubscriber[] = [];

  async function execute() {
    const tasks: Promise<Response>[] = [];

    for (let i = 0; i < batchLoadingCount; i++) {
      tasks.push(
        fetch(
          `https://${language}.wikipedia.org/api/rest_v1/page/random/summary`
        )
      );
    }

    const results = await Promise.all(tasks);

    const pages = results.map((x) => x.json() as Promise<RandomPageResponse>);

    const responses = await Promise.all(pages);

    stored = [...stored, ...responses];
  }

  onMount(() => {
    execute();

    window.addEventListener('hashchange', () => {
      hash = window.location.hash;
    });

    if (debugMode) {
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

    return () => {
      storeSubscriptions.forEach((x) => x());
      storeSubscriptions = [];
    };
  });

  onDestroy(() => {});
</script>

<Header />

{#if hash == ''}
  <Home randomPageResponses={stored} loadNewPages={execute} />
{/if}

{#if hash == '#favorites'}
  <Favorite />
{/if}

{#if hash == '#history'}
  <History />
{/if}
