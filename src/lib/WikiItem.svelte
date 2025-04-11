<script lang="ts">
  import type { WikiListItem } from './types';

  type Props = {
    backgroundUrl: string;
    wikiUrl: string;
    title: string;
    excerpt: string;
    isFaved?: boolean;
    smallBackgroundUrl: string;
    onVisit: (item: WikiListItem) => void;
    onFavorite: (item: WikiListItem, isFavorite: boolean) => void;
  };

  let {
    backgroundUrl,
    wikiUrl,
    title,
    excerpt,
    onVisit,
    onFavorite,
    isFaved,
    smallBackgroundUrl,
  }: Props = $props();

  let isFavorite = $state<boolean>(!!isFaved);

  function handleClick(event: MouseEvent) {
    onVisit({
      title,
      extract: excerpt,
      url: wikiUrl,
      thumbnail: backgroundUrl,
      smallThumbnail: smallBackgroundUrl,
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
        smallThumbnail: smallBackgroundUrl,
      } as WikiListItem,
      isFavorite
    );
  }

  function copyToClipboard(content: string): void {
    if (!navigator.clipboard) {
      const el = document.createElement('input');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    } else {
      navigator.clipboard.writeText(content);
    }

    alert('Link successfully copied to clipboard');
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
        rel="noopener noreferrer"
        class="block text-3xl"
        onclick={handleClick}
      >
        <h2>{title}</h2>
      </a>
      <button
        class="block cursor-pointer"
        title={isFavorite ? 'Unfavorite' : 'Favorite'}
        onclick={handleFavorite}
        aria-label={isFavorite ? 'Unfavorite this item' : 'Favorite this item'}
      >
        {#if isFavorite}
          <i class="bi bi-heart-fill"></i>
          <span class="sr-only">Unfavorite this item</span>
        {:else}
          <i class="bi bi-heart"></i>
          <span class="sr-only">Favorite this item</span>
        {/if}
      </button>
      <button
        class="block cursor-pointer text-2xl"
        title="Copy link to clipboard"
        onclick={() => copyToClipboard(wikiUrl)}
        aria-label="Copy link to clipboard"
      >
        <i class="bi bi-link-45deg"></i>
        <span class="sr-only">Copy link to clipboard</span>
      </button>
    </div>
    <p>
      <span class="md:hidden">
        {#if excerpt.length > 200}
          {excerpt.slice(0, 200)}...
        {:else}
          {excerpt}
        {/if}
      </span>

      <span class="hidden md:inline" aria-hidden="true">
        {excerpt}
      </span>
    </p>
  </div>
</article>
