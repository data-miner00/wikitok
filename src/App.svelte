<script lang="ts">
  import { onMount } from 'svelte';

  import Header from './lib/Header.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';
  import {
    batchLoadingCount,
    localStorageLanguageKey,
    localStoragePrefix,
  } from './lib/constants';
  import type { Language } from './lib/types';
  import Favorite from './lib/views/Favorite.svelte';
  import History from './lib/views/History.svelte';
  import Home from './lib/views/Home.svelte';

  let language =
    (localStorage.getItem(
      localStoragePrefix + localStorageLanguageKey
    ) as Language) || 'en';
  let stored: RandomPageResponse[] = $state([]);

  let hash = $state(window.location.hash);

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
    window.addEventListener('hashchange', () => {
      hash = window.location.hash;
    });
  });
</script>

<Header currentLanguage={language} />

{#if hash == ''}
  {#await execute()}
    <span class="loader absolute top-1/2 left-1/2 block"></span>
  {:then _}
    <Home randomPageResponses={stored} loadNewPages={execute} />
  {:catch error}
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
    >
      <div>
        <i class="bi bi-exclamation-diamond text-3xl"></i>
      </div>
      <p>Something went wrong. Please refresh the web page.</p>
      <p class="sr-only">{error.message}</p>
    </div>
  {/await}
{/if}

{#if hash == '#favorites'}
  <Favorite />
{/if}

{#if hash == '#history'}
  <History />
{/if}

<style>
  .loader {
    transform: rotateZ(45deg) translate(-50%, -50%);
    perspective: 1000px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    color: #fff;
  }
  .loader::before,
  .loader::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  .loader::after {
    color: #ff3d00;
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
</style>
