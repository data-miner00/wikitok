<script lang="ts">
  import { backInOut, circIn, cubicIn, sineIn } from 'svelte/easing';
  import { Spring, Tween, prefersReducedMotion } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';

  import { localStorageLanguageKey, localStoragePrefix } from './constants';
  import { type Language, languageMap } from './types';

  type Props = {
    currentLanguage: Language;
    isHistoryDialogOpen: boolean;
    isFavoriteDialogOpen: boolean;
    isMobileSidebarOpen: boolean;
  };

  let {
    currentLanguage,
    isFavoriteDialogOpen = $bindable(),
    isHistoryDialogOpen = $bindable(),
    isMobileSidebarOpen = $bindable(),
  }: Props = $props();

  function changeLanguage(language: Language) {
    localStorage.setItem(
      localStoragePrefix + localStorageLanguageKey,
      language
    );
    window.location.reload();
  }

  let isLanguageMenuOpen = $state(false);
  let isMenuExpanded = $state(false);

  function toggleLanguageMenu() {
    isLanguageMenuOpen = !isLanguageMenuOpen;

    // Automatically focus the first language button
    if (isLanguageMenuOpen) {
      setTimeout(() => {
        const firstLanguageButton = document.querySelector(
          '#language-menu button'
        );
        if (firstLanguageButton && firstLanguageButton instanceof HTMLElement) {
          firstLanguageButton.focus();
        }
      }, 0);
    }
  }
</script>

<header
  class="fixed top-0 left-0 z-10 flex w-screen items-center justify-between p-4 text-white"
>
  <div>
    <a
      href="/"
      class="text-2xl font-semibold tracking-wider uppercase"
      title="Home">Wikitok</a
    >
    <span>{currentLanguage}</span>
  </div>

  <nav class="flex items-center gap-8">
    {#if isMenuExpanded}
      <ul
        transition:fade={{ duration: 200, easing: cubicIn }}
        class="relative flex items-center gap-3 text-xl after:absolute after:top-2 after:-right-5 after:h-4 after:w-px after:bg-white/40"
        id="menu"
      >
        <li>
          <a
            href="https://www.wikipedia.org/"
            title="Wikipedia"
            target="_blank"
            aria-label="Wikipedia"
            rel="noopener noreferrer"
          >
            <i class="bi bi-wikipedia" aria-hidden="true"></i>
            <span class="sr-only">Wikipedia</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/data-miner00/wikitok"
            title="GitHub repository"
            target="_blank"
            aria-label="GitHub repository"
            rel="noopener noreferrer"
          >
            <i class="bi bi-github" aria-hidden="true"></i>
            <span class="sr-only">GitHub repository</span>
          </a>
        </li>
        <li>
          <button
            class="cursor-pointer outline-0"
            title="Favorites"
            aria-label="Favorites"
            onclick={() => (isFavoriteDialogOpen = !isFavoriteDialogOpen)}
          >
            <i class="bi bi-heart" aria-hidden="true"></i>
            <span class="sr-only">Favorites</span>
          </button>
        </li>
        <li>
          <button
            class="cursor-pointer outline-0"
            title="Past visits"
            aria-label="Past visits"
            onclick={() => (isHistoryDialogOpen = !isHistoryDialogOpen)}
          >
            <i class="bi bi-clock" aria-hidden="true"></i>
            <span class="sr-only">Past visits</span>
          </button>
        </li>
        <li class="relative">
          <button
            id="language-toggle"
            class="cursor-pointer"
            onclick={toggleLanguageMenu}
            aria-label="Change language"
            aria-expanded={isLanguageMenuOpen}
            aria-controls="language-menu"
          >
            <i class="bi bi-translate" aria-hidden="true"></i>
            <span class="sr-only">Change language</span>
          </button>

          {#if isLanguageMenuOpen}
            <ul
              transition:fly={{ y: -10, duration: 200, easing: sineIn }}
              id="language-menu"
              class="absolute right-0 -bottom-[570px] overflow-hidden rounded bg-white/20 text-lg shadow-md"
              aria-labelledby="language-toggle"
            >
              {#each Object.keys(languageMap) as lang}
                <li>
                  <button
                    class="block w-full cursor-pointer px-2 py-1 hover:bg-black/40"
                    onclick={() => changeLanguage(lang as Language)}
                    tabindex="0">{languageMap[lang as Language]}</button
                  >
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      </ul>
    {/if}

    <button
      class="cursor-pointer text-2xl lg:hidden"
      onclick={() => (isMobileSidebarOpen = !isMobileSidebarOpen)}
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileSidebarOpen}
      aria-controls="mobile-menu"
    >
      <i class="bi bi-list" aria-hidden="true"></i>
    </button>

    <button
      class="hidden cursor-pointer text-2xl text-white lg:block"
      onclick={() => (isMenuExpanded = !isMenuExpanded)}
      aria-label="Toggle menu"
      aria-expanded={isMenuExpanded}
      aria-controls="menu"
    >
      <i class="bi {isMenuExpanded ? 'bi-x-lg' : 'bi-list'}" aria-hidden="true"
      ></i>
    </button>
  </nav>
</header>
