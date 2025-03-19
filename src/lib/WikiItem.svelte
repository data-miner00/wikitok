<script lang="ts">
  let { backgroundUrl, wikiUrl, title, excerpt } = $props();
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
  >
    <h2 class="mb-2 text-3xl">{title}</h2>
    <p>{excerpt}</p>
  </a>
</article>
