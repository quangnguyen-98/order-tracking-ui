import { Pagination } from '../Common';

export const OrderStatuses = [
  {
    value: 'CREATED',
    displayName: 'Created'
  },
  {
    value: 'ACCEPTED',
    displayName: 'Accepted'
  },
  {
    value: 'DRIVERASSIGNED',
    displayName: 'Driver Assigned'
  },
  {
    value: 'DELIVERING',
    displayName: 'Delivering'
  },
  {
    value: 'DONE',
    displayName: 'Done'
  },
  {
    value: 'CANCELED',
    displayName: 'Canceled'
  }
];

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
  totalPrice: number | undefined;
  createdDate: string | null;
  updatedDate: string | null;
  originalUpdatedDate?: string | null;
}

export interface ListOrderResponse {
  data: Order[];
  pagination: Pagination;
}

export interface OrderModalResponse {
  status: string | null;
  data: Order;
}