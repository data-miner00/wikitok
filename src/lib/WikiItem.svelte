<script lang="ts">
  import type { WikiListItem } from './types';

  type Props = {
    backgroundUrl: string;
    wikiUrl: string;
    title: string;
    excerpt: string;
    onVisit: (item: WikiListItem) => void;
    onFavorite: (item: WikiListItem, isFavorite: boolean) => void;
  };

  let isFavorite = $state(false);

  let { backgroundUrl, wikiUrl, title, excerpt, onVisit, onFavorite }: Props =
    $props();

  function handleClick(event: MouseEvent) {
    onVisit({
      title,
      extract: excerpt,
      url: wikiUrl,
      thumbnail: backgroundUrl,
    } as WikiListItem);
  }

  function handleFavorite(event: MouseEvent) {
    isFavorite = !isFavorite;

    onFavorite(
      {
        title,
        extract: excerpt,
        url: wikiUrl,
        thumbnail: backgroundUrl,
      } as WikiListItem,
      isFavorite
    );
  }
</script>

<article
  class="relative h-screen w-screen snap-start bg-slate-400 bg-cover bg-center bg-no-repeat bg-blend-darken"
  style:background-image={`url('${backgroundUrl}')`}
>
  <div class="absolute bottom-0 left-0 block w-full bg-black/50 p-4 text-white">
    <div class="mb-2 flex items-center gap-4">
      <a
        href={wikiUrl}
        target="_blank"
        rel="noopener"
        class="block text-3xl"
        onclick={handleClick}
      >
        <h2>{title}</h2>
      </a>
      <button
        class="block cursor-pointer"
        title={isFavorite ? 'Unfavorite' : 'Favorite'}
        onclick={handleFavorite}
        aria-label="Favorite this item"
      >
        {#if isFavorite}
          <i class="bi bi-heart-fill"></i>
        {:else}
          <i class="bi bi-heart"></i>
        {/if}
      </button>
      <div class="text-2xl">
        <i class="bi bi-link-45deg"></i>
      </div>
    </div>
    <p>{excerpt}</p>
  </div>
</article>
