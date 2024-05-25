import {Language} from "src/@core/interface/language/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";

interface TranslationContent {
  lang_code: string;
  content: {
    title: string;
    description: string;
  };
}

export interface Category {
  translate_content: TranslationContent[];
  id: string;
  subcategories: Subcategory[];
  image: string;
  language: Language[];
}
