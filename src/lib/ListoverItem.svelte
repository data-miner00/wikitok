<script lang="ts">
  type Props = {
    wikiUrl: string;
    imageUrl: string;
    title: string;
    excerpt: string;
  };

  let { wikiUrl, imageUrl, title, excerpt }: Props = $props();
</script>

<a href={wikiUrl} target="_blank" rel="noopener noreferrer" class="group">
  <article class="flex items-center">
    <div class="h-[100px] basis-[100px]">
      <!-- todo: use smaller image -->
      <img class="h-full w-full object-cover" src={imageUrl} alt={title} />
    </div>
    <div class="basis-[calc(100%-100px)] pl-4">
      <h2 class="text-2xl group-hover:text-gray-300">{title}</h2>
      <p class="text-sm">{excerpt}</p>
    </div>
  </article>
</a>
