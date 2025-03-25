export type WikiListItem = {
  title: string;
  extract: string;
  thumbnail: string;
  url: string;
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
