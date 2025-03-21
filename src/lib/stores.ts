import { writable } from 'svelte/store';

import {
  localStorageFavoriteKey,
  localStorageHistoryKey,
  localStoragePrefix,
} from './constants';
import type { WikiList } from './types';

export const historyList = writable<WikiList>(
  localStorage.getItem(localStoragePrefix + localStorageHistoryKey)
    ? JSON.parse(
        localStorage.getItem(
          localStoragePrefix + localStorageHistoryKey
        ) as string
      )
    : []
);
export const favoriteList = writable<WikiList>(
  localStorage.getItem(localStoragePrefix + localStorageHistoryKey)
    ? JSON.parse(
        localStorage.getItem(
          localStoragePrefix + localStorageFavoriteKey
        ) as string
      )
    : []
);
