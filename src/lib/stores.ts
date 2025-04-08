import { derived, writable } from 'svelte/store';

import {
  localStorageFavoriteKey,
  localStorageHistoryKey,
  localStoragePrefix,
} from './constants';
import type { WikiList } from './types';

export const historyQuery = writable('');
export const historyList = writable<WikiList>(
  localStorage.getItem(localStoragePrefix + localStorageHistoryKey)
    ? JSON.parse(
        localStorage.getItem(
          localStoragePrefix + localStorageHistoryKey
        ) as string
      )
    : []
);
export const filteredHistoryList = derived(
  [historyQuery, historyList],
  ([$historyQuery, $historyList]) =>
    $historyList.filter(
      (x) =>
        x.title.includes($historyQuery) || x.extract.includes($historyQuery)
    )
);

export const favoriteQuery = writable('');
export const favoriteList = writable<WikiList>(
  localStorage.getItem(localStoragePrefix + localStorageFavoriteKey)
    ? JSON.parse(
        localStorage.getItem(
          localStoragePrefix + localStorageFavoriteKey
        ) as string
      )
    : []
);
export const filteredFavoriteList = derived(
  [favoriteQuery, favoriteList],
  ([$favoriteQuery, $favoriteList]) =>
    $favoriteList.filter(
      (x) =>
        x.title.includes($favoriteQuery) || x.extract.includes($favoriteQuery)
    )
);
