<script lang="ts">
  import { localStorageLanguageKey, localStoragePrefix } from './constants';
  import type { Language } from './types';

  type Props = {
    currentLanguage: Language;
    isHistoryDialogOpen: boolean;
    isFavoriteDialogOpen: boolean;
  };

  let {
    currentLanguage,
    isFavoriteDialogOpen = $bindable(),
    isHistoryDialogOpen = $bindable(),
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

  const languageMap: Record<Language, string> = {
    en: 'English',
    es: 'Español', // Spanish
    de: 'Deutsch', // German
    fr: 'Français', // French
    id: 'Bahasa Indonesia', // Indonesian
    ms: 'Bahasa Melayu', // Malay
    it: 'Italiano', // Italian
    pl: 'Polski', // Polish
    pt: 'Português', // Portuguese
    ru: 'Русский', // Russian
    sv: 'Svenska', // Swedish
    ja: '日本語',
    zh: '中文',
    ko: '한국어',
  };
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
    <ul
      class="relative items-center gap-3 text-xl after:absolute after:top-2 after:-right-5 after:h-4 after:w-px after:bg-white/40 {isMenuExpanded
        ? 'flex'
        : 'hidden'}"
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
          class="cursor-pointer"
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
          class="cursor-pointer"
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
            id="language-menu"
            class="absolute right-0 -bottom-[570px] overflow-hidden rounded bg-white/20 text-lg shadow-md"
            aria-labelledby="language-toggle"
          >
            {#each Object.keys(languageMap) as lang}
              <li>
                <button
                  class="block w-full cursor-pointer px-2 py-1 transition-colors duration-150 hover:bg-white/60"
                  onclick={() => changeLanguage(lang as Language)}
                  tabindex="0">{languageMap[lang as Language]}</button
                >
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    </ul>

    <button
      class="cursor-pointer text-2xl text-white"
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
