import {Language} from "src/@core/interface/language/interface";

interface TranslationContent {
  lang_code: string;
  content: {
    title: string;
    description: string;
  };
}

export interface Subcategory {
  translate_content: TranslationContent[];
  id: string;
  category_id: string;
  image: string;
  language: Language[];
}
