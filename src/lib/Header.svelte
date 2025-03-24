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

  function toggleLanguageMenu() {
    isLanguageMenuOpen = !isLanguageMenuOpen;
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
  </div>
  <nav>
    <ul class="flex items-center gap-3 text-xl">
      <li>
        <a href="#"> Home </a>
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
            class="absolute right-0 -bottom-12 rounded bg-gray-500 p-2 shadow-md"
          >
            <li>
              <button onclick={() => changeLanguage('en')}>English</button>
            </li>
            <li>
              <button
                onclick={() => {
                  changeLanguage('ko');
                  toggleLanguageMenu();
                }}>Korean</button
              >
            </li>
            <li>
              <button
                onclick={() => {
                  changeLanguage('ja');
                  toggleLanguageMenu();
                }}>Japanese</button
              >
            </li>
          </ul>
        {/if}
      </li>
    </ul>
  </nav>
</header>
