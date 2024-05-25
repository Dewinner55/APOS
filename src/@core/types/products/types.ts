// Adapted FormDataType for products
import {Category} from "src/@core/interface/category/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Brands} from "src/@core/interface/brands/interface";

export type FormDataType = {
  [k: string]: {
    lang_code: string;
    content: {
      title: string;
      description: string;
    };
    translate_content?: { lang_code: string; content: { name: string; description: string; }; }[];
    price?: number;
    product_discount?: number;
    available?: boolean;
    is_deliverable?: boolean;
    id?: string;
    category?: Category;
    subcategory?: Subcategory;
    product_info?: any;
    additional_info?: any;
    brand?: Brands;
  };
};
