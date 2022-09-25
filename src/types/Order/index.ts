import { Pagination } from '../Common';

export interface Dishes {
  _id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
}

export interface Order {
  _id: string | undefined;
  address: string | undefined;
  orderName: string | undefined;
  merchantAddress: string | undefined;
  merchantName: number | undefined;
  riderName: number | undefined;
  status: string | undefined;
  dishes: Dishes[];
  totalPrice: number;
  wasPurchasedOnline: boolean;
  createdDate: string | null;
  updatedDate: string | null;
  statusUpdatedDate: string | null;
}

export interface ListOrderResponse {
  data: Order[];
  pagination: Pagination;
}

export interface OrderModalResponse {
  status: string | null;
  data: Order;
}
