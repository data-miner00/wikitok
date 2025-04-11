<script lang="ts">
  import { localStorageLanguageKey, localStoragePrefix } from './constants';
  import { type Language, languageMap } from './types';

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

  let isLanguageMenuOpen = $state(false);

  function changeLanguage(language: Language) {
    localStorage.setItem(
      localStoragePrefix + localStorageLanguageKey,
      language
    );
    window.location.reload();
  }
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
      <button
        class="cursor-pointer"
        onclick={() => (isLanguageMenuOpen = !isLanguageMenuOpen)}
        aria-label="Change language"
        aria-expanded={isLanguageMenuOpen}
        aria-controls="language-menu-sidebar"
      >
        <i class="bi bi-translate"></i>

        <span>Language</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button
        class="cursor-pointer"
        onclick={() => (isFavoriteDialogOpen = !isFavoriteDialogOpen)}
      >
        <i class="bi bi-heart"></i>

        <span>Favorite</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button
        class="cursor-pointer"
        onclick={() => (isHistoryDialogOpen = !isHistoryDialogOpen)}
      >
        <i class="bi bi-clock"></i>

        <span>History</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button class="cursor-pointer">
        <i class="bi bi-github"></i>

        <span>GitHub</span>
      </button>
    </li>
    <li class="w-full px-5 py-5 text-xl">
      <button class="cursor-pointer">
        <i class="bi bi-wikipedia"></i>

        <span>Wikipedia</span>
      </button>
    </li>
  </ul>
</aside>

{#if isLanguageMenuOpen}
  <ul
    id="language-menu-sidebar"
    class="absolute inset-5 z-30 overflow-y-auto rounded-xl bg-black/80 text-3xl"
    aria-labelledby="language-toggle"
  >
    <li>
      <button
        class="block w-full cursor-pointer py-3 hover:bg-white/10"
        onclick={() => (isLanguageMenuOpen = false)}
        tabindex="0"
        aria-label="Close language menu"
      >
        <i class="bi bi-x-lg text-3xl"></i>
      </button>
    </li>

    {#each Object.keys(languageMap) as lang}
      <li>
        <button
          class="block w-full cursor-pointer py-3 hover:bg-white/10"
          onclick={() => changeLanguage(lang as Language)}
          tabindex="0">{languageMap[lang as Language]}</button
        >
      </li>
    {/each}
  </ul>
{/if}
