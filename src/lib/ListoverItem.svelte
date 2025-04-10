<script lang="ts">
  type Props = {
    wikiUrl: string;
    imageUrl: string;
    title: string;
    excerpt: string;
    onXClick?: (id: string) => void;
  };

  let { wikiUrl, imageUrl, title, excerpt, onXClick }: Props = $props();

  function onRemove() {
    if (onXClick) {
      onXClick(wikiUrl);
    }
  }
</script>

<div class="group">
  <article class="relative flex items-center">
    <a
      class="flex items-center"
      href={wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="hidden h-[100px] basis-[100px] md:block">
        <!-- todo: use smaller image -->
        <img class="h-full w-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div
        class="{onXClick
          ? 'md:basis-[calc(100%-150px)]'
          : 'md:basis-[calc(100%-100px)]'} md:pl-4"
      >
        <h2 class="text-2xl group-hover:text-gray-300">{title}</h2>
        <p class="text-sm">
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
    </a>
    {#if onXClick}
      <div
        class="absolute top-0 right-0 z-10 md:ml-auto md:block md:basis-[50px]"
      >
        <button
          class="mx-auto block cursor-pointer"
          aria-label="Remove from list"
          onclick={onRemove}
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    {/if}
  </article>
</div>
