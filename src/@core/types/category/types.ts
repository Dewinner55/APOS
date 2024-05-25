import {Category} from "src/@core/interface/category/interface";

export type UsersTypeWithAction = Category & {
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
