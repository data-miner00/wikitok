<script lang="ts">
  type Props = {
    isOpen: boolean;
    isHistoryDialogOpen: boolean;
    isFavoriteDialogOpen: boolean;
  };

  let {
    isOpen = $bindable(),
    isFavoriteDialogOpen = $bindable(),
    isHistoryDialogOpen = $bindable(),
  }: Props = $props();
</script>

<aside
  id="mobile-menu"
  class="absolute top-0 z-20 h-screen w-4/5 border-r border-solid border-[#444] bg-[#222]/80 transition-all duration-150 {isOpen
    ? 'right-0'
    : '-right-full'}"
>
  <ul>
    <li class="w-full p-5">
      <button
        class="cursor-pointer"
        onclick={() => (isOpen = !isOpen)}
        aria-label="Toggle mobile sidebar"
      >
        <i class="bi bi-x-lg text-3xl"></i>
      </button>
    </li>

    <li class="w-full px-5 py-5 text-xl">
      <button>
        <i class="bi bi-translate"></i>

        <span>Language</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button onclick={() => (isFavoriteDialogOpen = !isFavoriteDialogOpen)}>
        <i class="bi bi-heart"></i>

        <span>Favorite</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button onclick={() => (isHistoryDialogOpen = !isHistoryDialogOpen)}>
        <i class="bi bi-clock"></i>

        <span>History</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button>
        <i class="bi bi-github"></i>

        <span>GitHub</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button>
        <i class="bi bi-wikipedia"></i>

        <span>Wikipedia</span>
      </button>
    </li>
  </ul>
</aside>
