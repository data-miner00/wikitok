<script lang="ts">
  import { onMount } from 'svelte';

  import Header from './lib/Header.svelte';
  import WikiItem from './lib/WikiItem.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';
  import { placeholderResponse } from './lib/data';

  let stored: RandomPageResponse[] = [placeholderResponse];

  let container: HTMLElement;
  let lastExecuted: Date;

  onMount(() => {
    async function execute() {
      lastExecuted = new Date();
      const initialLoadingCount = 5;
      const tasks: Promise<Response>[] = [];

      for (let i = 0; i < initialLoadingCount; i++) {
        tasks.push(
          fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
        );
      }

      const results = await Promise.all(tasks);

      const pages = results.map((x) => x.json() as Promise<RandomPageResponse>);

      const responses = await Promise.all(pages);

      stored = [...stored, ...responses];
      console.log(stored);
    }

    execute();

    container = document.getElementsByTagName('main')?.[0];

    function handler(event: Event) {
      const target = event.target as HTMLElement;
      const totalHeight = target.scrollHeight;
      const scrollHeight = target.scrollTop;

      if (
        scrollHeight / totalHeight > 0.8 &&
        Date.now() - lastExecuted.getTime() > 2000
      ) {
        execute();
        console.log('hello debounce');
      }

      console.log(totalHeight);
      console.log(scrollHeight);
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
    />
  {/each}
</main>
