export interface OrderResponse {
  status: boolean;
  message: string;
  data: Order[];
}

export interface Order {
  _id: string;
  userId: string;
  product: OrderedProduct[];
  group: null ;
  booking: null ;
  coach: null ;
  amount: number;
  currency: string;
  type: string; // e.g., "product"
  paymentIntentId: string;
  status: string; // e.g., "failed", "succeeded"
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderedProduct {
  _id: string;
  quantity: number;
  product: ProductInfo | null;
}

export interface ProductInfo {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
  brand: string;
}

export interface Category {
  _id: string;
  name: string;
}
