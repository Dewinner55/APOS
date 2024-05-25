import {Category} from "src/@core/interface/category/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Brands} from "src/@core/interface/brands/interface";

export interface TranslationContent {
  lang_code: string;
  name?: string;
  description?: string;
  title?: string;
}

export interface ContentProduct {
  name: string;
  description: string;
}

export interface ProductTemplate {
  _id: "string",
  name: "string",
  fields: ["string"]
}

export interface ProductTranslate {
  lang_code: string;
  content: ContentProduct;
}

export interface ProductInfo {
  color_code: string;
  is_storage_countable: boolean;
  quantity_in_storage: number;
  images: [];
}

export interface Product {
  translate_content: ProductTranslate[];
  old_price: number;
  price: number;
  product_discount: number;
  available: boolean;
  id: string;
  category: Category;
  subcategory: Subcategory;
  brand: Brands;
  product_info: [ ProductInfo ],
}

export interface ProductsResponse {
  page: number;
  page_size: number;
  total: number;
  items: Product[];
}

export interface ProductsProps {
  productList: {
    items: Product[];
    page: number;
    page_size: number;
    total: number;
  };
  isLoading: boolean;
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  selectedBrandId: string;
  selectedLanguageId: string;
  selectAll: boolean;
  toggleSelectAll: () => void;
  initialCookie: string;
}

export const initialProductInfo = {
  color_code: "",
  is_storage_countable: false,
  quantity_in_storage: 0,
  images: [],
};

export const initialProductState = {
  translate_content: [{ lang_code: "ru", name: "", description: "" }],
  price: 0,
  product_discount: 0,
  product_info: [ initialProductInfo ],
  available: false,
  category_id: "",
  subcategory_id: "",
  brand_id: "",
};
