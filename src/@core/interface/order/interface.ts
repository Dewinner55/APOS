interface TranslateContent {
  lang_code: string;
  content: {
    name: string;
    description: string;
  };
}

interface ProductInfo {
  info_0: {
    product_id: string | null;
    color_code: string;
    is_storage_countable: boolean;
    quantity_in_storage: number;
    images: string[];
  };
}

interface AdditionalInfoField {
  key: {
    en: string;
    ru: string;
  };
  value: string;
}

interface AdditionalInfo {
  id: string;
  name: string;
  fields: AdditionalInfoField[];
}

interface Brand {
  translate_content: TranslateContent[];
  id: string;
  icon: string | null;
}

interface Product {
  translate_content: TranslateContent[];
  price: number;
  product_discount: number;
  available: boolean;
  is_deliverable: boolean;
  id: string;
  category: string | null;
  subcategory: string | null;
  product_info: ProductInfo;
  additional_info: AdditionalInfo;
  brand: Brand;
}

interface OrderProduct {
  quantity: number;
  product: Product;
  purchase_price: number;
}

interface Customer {
  id: string;
  email: string;
  first_name: string;
  display_name: string;
  phone: string;
}

export interface Order {
  address: string;
  customer: Customer;
  id: string;
  total_price: number;
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'cancelled';
  products: OrderProduct[];
  promocodes: any[];
}

export interface Address {
  title: string;
  meta: React.ReactNode;
  value: string;
  isSelected?: boolean;
  content: React.ReactNode;
}

export interface DeliverySpeed {
  isSelected?: boolean;
  value: string;
  title: string;
  asset: string;
  content: React.ReactNode;
}
