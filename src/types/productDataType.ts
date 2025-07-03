export type ProductResponse = {
  status: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
      limit: number;
    };
  };
};

export type Product = {
  _id: string;
//   avgRating?:string; 
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  avgRating?: number | null;
  totalReviews?: number;
};