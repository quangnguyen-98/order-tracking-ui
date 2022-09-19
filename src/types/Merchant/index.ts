import { Pagination } from '../Common';

export interface Dishes {
  _id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  createdDate: string | null;
  updatedDate: string | null;
}

export interface ListDishesResponse {
  data: Dishes[];
  pagination: Pagination;
}

export interface DishesModalResponse {
  status: string | null;
  data: Dishes;
}
