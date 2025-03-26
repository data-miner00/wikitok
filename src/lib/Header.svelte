<script lang="ts">
  import { localStorageLanguageKey, localStoragePrefix } from './constants';
  import type { Language } from './types';

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
      href="#"
      class="text-2xl font-semibold tracking-wider uppercase"
      title="Home">Wikitok</a
    >
  </div>

  <div class="flex items-center gap-8">
    <ul
      class="relative items-center gap-3 text-xl after:absolute after:top-2 after:-right-5 after:h-4 after:w-px after:bg-white/40 {isMenuExpanded
        ? 'flex'
        : 'hidden'}"
    >
      <li>
        <a
          href="https://github.com/data-miner00/wikitok"
          title="GitHub repository"
          target="_blank"
        >
          <i class="bi bi-github"></i>
        </a>
      </li>
      <li>
        <a href="#favorites" title="Favorites">
          <i class="bi bi-heart"></i>
        </a>
      </li>
      <li>
        <a href="#history" title="Past visits">
          <i class="bi bi-clock"></i>
        </a>
      </li>
      <li class="relative">
        <button class="" onclick={toggleLanguageMenu}>
          <i class="bi bi-translate"></i>
        </button>

        {#if isLanguageMenuOpen}
          <ul
            class="absolute right-0 -bottom-[570px] overflow-hidden rounded bg-white/20 text-lg shadow-md"
          >
            {#each Object.keys(languageMap) as lang}
              <li>
                <button
                  class="block w-full cursor-pointer px-2 py-1 transition-colors duration-150 hover:bg-white/60"
                  onclick={() => changeLanguage(lang as Language)}
                  >{languageMap[lang as Language]}</button
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
    >
      <i class="bi {isMenuExpanded ? 'bi-x-lg' : 'bi-list'}"></i>
    </button>
  </div>
</header>
