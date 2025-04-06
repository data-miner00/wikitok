<script lang="ts">
  import ListoverItem from './ListoverItem.svelte';
  import { favoriteList } from './stores';
  import type { WikiList } from './types';

  type Props = {
    isOpen: boolean;
  };

  let { isOpen = $bindable() }: Props = $props();

  let dialog = $state<HTMLDialogElement | null>(null);
  let query = $state<string>('');

  $effect(() => {
    if (isOpen) dialog?.showModal();
  });

  let stored = $state<WikiList>([]);
  let filtered = $state<WikiList>([]);

  favoriteList.subscribe((value) => {
    stored = value;
    filtered = value;
  });

  function onFilter(event: Event) {
    if (query.length === 0) {
      filtered = stored;
      return;
    }

    filtered = stored.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.extract.toLowerCase().includes(query)
      );
    });
  }
</script>

<dialog
  bind:this={dialog}
  onclose={() => {
    query = '';
    filtered = stored;
    isOpen = false;
  }}
  onclick={(e) => {
    if (e.target === dialog) dialog?.close();
  }}
  class="fixed top-[5%] left-1/2 mx-auto my-[5%] max-h-4/5 w-4/5 -translate-x-1/2 overflow-y-auto border-[1px] border-solid border-[#444] bg-[#222] p-4 text-white"
>
  <h2 class="mb-4 text-3xl font-bold">Favorites</h2>

  <div>
    <input
      type="text"
      placeholder="Search..."
      class="mb-4 w-full border-[1px] border-solid border-[#444] bg-[#333] p-2 outline-0"
      bind:value={query}
      onkeyup={onFilter}
    />
  </div>

  <ul>
    {#each filtered as item}
      <li class="p-2">
        <ListoverItem
          wikiUrl={item.url}
          imageUrl={item.thumbnail}
          title={item.title}
          excerpt={item.extract}
        />
      </li>
    {/each}
  </ul>
</dialog>

<style>
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(2px);
  }
</style>
