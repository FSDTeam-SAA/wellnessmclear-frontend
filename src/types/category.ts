export interface SubCategory {
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
  categoryImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
}
