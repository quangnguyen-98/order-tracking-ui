import { Pagination } from '../Common';

export interface Order {
  _id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  createdDate: string | null;
  updatedDate: string | null;
}

export interface ListOrderResponse {
  data: Order[];
  pagination: Pagination;
}

export interface OrderModalResponse {
  status: string | null;
  data: Order;
}
