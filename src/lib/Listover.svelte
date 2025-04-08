<script lang="ts">
  import type { Writable } from 'svelte/store';

  import ListoverItem from './ListoverItem.svelte';
  import type { WikiList } from './types';

  type Props = {
    dialogTitle: string;
    isOpen: boolean;
    wikiList: WikiList;
    queryStore: Writable<string>;
  };

  let {
    isOpen = $bindable(),
    wikiList,
    dialogTitle,
    queryStore,
  }: Props = $props();

  let dialog = $state<HTMLDialogElement | null>(null);
  let query = $state<string>('');

  $effect(() => {
    if (isOpen) dialog?.showModal();

    queryStore.set(query);
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => {
    query = '';
    isOpen = false;
  }}
  onclick={(e) => {
    if (e.target === dialog) dialog?.close();
  }}
  class="fixed top-[5%] left-1/2 mx-auto my-[5%] max-h-4/5 w-4/5 -translate-x-1/2 overflow-y-auto border-[1px] border-solid border-[#444] bg-[#222] p-4 pt-0 text-white"
>
  <div class="sticky top-0 left-0 bg-[#222] py-4">
    <h2 class="mb-4 text-3xl font-bold">{dialogTitle}</h2>

    <input
      type="text"
      placeholder="Search..."
      class="mb-4 w-full border-[1px] border-solid border-[#444] bg-[#333] p-2 outline-0"
      bind:value={query}
    />
  </div>

  <ul>
    {#each wikiList as item}
      <li class="my-2">
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
