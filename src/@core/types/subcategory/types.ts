import {Subcategory} from "src/@core/interface/subcategory/interface";

export type UsersTypeWithAction = Subcategory & {
  action?: string
}

export type FormDataType = {
  [key: string]: {
    lang_code: string;
    content: {
      title: string;
      description: string;
    };
    image: string;
  };
};
