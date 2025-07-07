export type SingleProductResponse = {
  status: boolean;
  message: string;
  data: {
    product: Product;
    reviews: Review[];
    totalReviews: number;
    relatedProducts: Product[];
  };
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  actualPrice: number;
  discountedPrice: number;
  savedPrice: number;
  image: string;
  category: string;
  subCategory: string;
  brand: string;
  countInStock: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type Review = {
  _id: string;
  userId: {
    _id: string;
    profileImage: string;
  };
  productId: string;
  rating: number;
  review: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};
