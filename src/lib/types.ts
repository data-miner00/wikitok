export type WikiListItem = {
  title: string;
  extract: string;
  thumbnail: string;
  smallThumbnail: string;
  url: string;
  visitedAt?: string;
  favoritedAt?: string;
};

export type WikiList = WikiListItem[];

export type Language =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'sv'
  | 'pl'
  | 'id'
  | 'ms'
  | 'zh';

export const languageMap: Record<Language, string> = {
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
