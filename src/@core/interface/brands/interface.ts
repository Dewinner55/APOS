export interface TranslationContent {
  lang_code: string;
  content: {
    name: string;
    description: string;
  };
}

export interface Brands {
  translate_content: TranslationContent[];
  id: string;
  icon?: string;
}
