import {Brands} from "src/@core/interface/brands/interface";

export type BrandsTypeWithAction = Brands & {
  action?: string
}

export type FormDataType = {
  [key: string]: {
    lang_code: string;
    content: {
      name: string;
      description: string;
    };
    icon: string;
  };
};
