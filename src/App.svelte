<script lang="ts">
  import { onMount } from 'svelte';

  import Header from './lib/Header.svelte';
  import type { RandomPageResponse } from './lib/Wikipedia/types';

  let stored: RandomPageResponse[] = [
    {
      type: 'standard',
      title: 'Sant Pere de les Puelles',
      displaytitle:
        '<span class="mw-page-title-main">Sant Pere de les Puelles</span>',
      namespace: {
        id: 0,
        text: '',
      },
      wikibase_item: 'Q11693387',
      titles: {
        canonical: 'Sant_Pere_de_les_Puelles',
        normalized: 'Sant Pere de les Puelles',
        display:
          '<span class="mw-page-title-main">Sant Pere de les Puelles</span>',
      },
      pageid: 41200727,
      thumbnail: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Barcelona_-_Esgl%C3%A9sia_de_Sant_Pere_de_Puelles.jpg/320px-Barcelona_-_Esgl%C3%A9sia_de_Sant_Pere_de_Puelles.jpg',
        width: 320,
        height: 240,
      },
      originalimage: {
        source:
          'https://upload.wikimedia.org/wikipedia/commons/4/43/Barcelona_-_Esgl%C3%A9sia_de_Sant_Pere_de_Puelles.jpg',
        width: 3072,
        height: 2304,
      },
      lang: 'en',
      dir: 'ltr',
      revision: '1267260523',
      tid: '016325a6-ca76-11ef-835a-5cb3f3ae8d5f',
      timestamp: '2025-01-04T08:29:25Z',
      description: 'Benedictine monastery in Barcelona, Catalonia, Spain',
      description_source: 'local',
      coordinates: {
        lat: 41.389661,
        lon: 2.178761,
      },
      content_urls: {
        desktop: {
          page: 'https://en.wikipedia.org/wiki/Sant_Pere_de_les_Puelles',
          revisions:
            'https://en.wikipedia.org/wiki/Sant_Pere_de_les_Puelles?action=history',
          edit: 'https://en.wikipedia.org/wiki/Sant_Pere_de_les_Puelles?action=edit',
          talk: 'https://en.wikipedia.org/wiki/Talk:Sant_Pere_de_les_Puelles',
        },
        mobile: {
          page: 'https://en.m.wikipedia.org/wiki/Sant_Pere_de_les_Puelles',
          revisions:
            'https://en.m.wikipedia.org/wiki/Special:History/Sant_Pere_de_les_Puelles',
          edit: 'https://en.m.wikipedia.org/wiki/Sant_Pere_de_les_Puelles?action=edit',
          talk: 'https://en.m.wikipedia.org/wiki/Talk:Sant_Pere_de_les_Puelles',
        },
      },
      extract:
        'Sant Pere de les Puel·les is a Benedictine monastery in the Sant Pere, Santa Caterina i la Ribera neighborhood of the Ciutat Vella district of Barcelona, Catalonia, Spain. The 10th-century building, Romanesque/Gothic in style, was declared a Bien de Interés Cultural landmark in 1931.',
      extract_html:
        '<p><b>Sant Pere de les Puel·les</b> is a Benedictine monastery in the Sant Pere, Santa Caterina i la Ribera neighborhood of the Ciutat Vella district of Barcelona, Catalonia, Spain. The 10th-century building, Romanesque/Gothic in style, was declared a Bien de Interés Cultural landmark in 1931.</p>',
    },
  ];

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
    <article
      class="h-screen w-screen snap-start bg-slate-400 bg-cover bg-center bg-no-repeat bg-blend-darken"
      style:background-image={`url('${page.originalimage.source}')`}
    >
      {page.content_urls}
    </article>
  {/each}
</main>
