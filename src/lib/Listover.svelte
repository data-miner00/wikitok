<script lang="ts">
  import type { Writable } from 'svelte/store';

  import ListoverItem from './ListoverItem.svelte';
  import type { WikiList } from './types';

  type Props = {
    dialogTitle: string;
    isOpen: boolean;
    wikiList: WikiList;
    queryStore: Writable<string>;
    enableRemove?: boolean;
    localStorageKey?: string;
  };

  let {
    isOpen = $bindable(),
    wikiList,
    dialogTitle,
    queryStore,
    enableRemove,
    localStorageKey,
  }: Props = $props();

  let dialog = $state<HTMLDialogElement | null>(null);
  let query = $state<string>('');

  let onXClick: ((id: string) => void) | undefined =
    enableRemove && localStorageKey
      ? (id: string) => {
          wikiList = wikiList.filter((item) => item.url !== id);
          localStorage.setItem(localStorageKey, JSON.stringify(wikiList));
        }
      : undefined;

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
  class="fixed top-[5%] left-1/2 mx-auto my-[5%] max-h-4/5 w-7/8 -translate-x-1/2 overflow-y-auto border-[1px] border-solid border-[#444] bg-[#222] p-4 pt-0 text-white md:w-4/5"
>
  <div class="sticky top-0 left-0 z-20 bg-[#222] py-4">
    <div class="flex items-center justify-between">
      <h2 class="mb-4 block text-3xl font-bold">{dialogTitle}</h2>
      <button
        class="block cursor-pointer text-2xl"
        aria-label="Close dialog"
        onclick={() => dialog?.close()}
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <input
      type="text"
      placeholder="Search..."
      class="mb-4 w-full border-[1px] border-solid border-[#444] bg-[#333] p-2 outline-0"
      bind:value={query}
    />

    <!-- TODO: Add X button to clear the query -->
  </div>

  <ul>
    {#each wikiList as item}
      <li class="my-6 first:mt-0 md:my-2">
        <ListoverItem
          wikiUrl={item.url}
          imageUrl={item.smallThumbnail}
          title={item.title}
          excerpt={item.extract}
          {onXClick}
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
