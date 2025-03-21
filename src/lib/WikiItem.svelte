<script lang="ts">
  import type { WikiListItem } from './types';

  let { backgroundUrl, wikiUrl, title, excerpt, onVisit } = $props();

  function handleClick(event: MouseEvent) {
    onVisit({
      title,
      extract: excerpt,
      url: wikiUrl,
      thumbnail: backgroundUrl,
    } as WikiListItem);
  }
</script>

<article
  class="relative h-screen w-screen snap-start bg-slate-400 bg-cover bg-center bg-no-repeat bg-blend-darken"
  style:background-image={`url('${backgroundUrl}')`}
>
  <a
    href={wikiUrl}
    target="_blank"
    rel="noopener"
    class="absolute bottom-0 left-0 block w-full bg-black/50 p-4 text-white"
    onclick={handleClick}
  >
    <h2 class="mb-2 text-3xl">{title}</h2>
    <p>{excerpt}</p>
  </a>
</article>
