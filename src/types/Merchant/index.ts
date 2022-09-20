import { Pagination } from '../Common';

export interface Dishes {
  _id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  quantity?: number | null;
  createdDate?: string | null;
  updatedDate?: string | null;
}

export interface ListDishesResponse {
  data: Dishes[];
  pagination: Pagination;
}

export interface DishesPayload {
  data: ListDishesResponse;
};

export interface DishesModalResponse {
  status: string | null;
  data: Dishes;
}