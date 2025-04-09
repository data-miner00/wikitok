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
  <article class="flex items-center">
    <a
      class="flex items-center"
      href={wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="h-[100px] basis-[100px]">
        <!-- todo: use smaller image -->
        <img class="h-full w-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div
        class="{onXClick
          ? 'basis-[calc(100%-150px)]'
          : 'basis-[calc(100%-100px)]'} pl-4"
      >
        <h2 class="text-2xl group-hover:text-gray-300">{title}</h2>
        <p class="text-sm">{excerpt}</p>
      </div>
    </a>
    {#if onXClick}
      <div class="ml-auto basis-[50px]" onclick={onRemove}>
        <button class="mx-auto block cursor-pointer">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    {/if}
  </article>
</div>
