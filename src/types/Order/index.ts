import { Pagination } from '../Common';
import { Dish } from '../Dish';

// Order table types
export interface Order {
  _id: string | undefined;
  address: string | undefined;
  orderName: string | undefined;
  merchantAddress: string | undefined;
  merchantName: number | undefined;
  riderName: number | undefined;
  status: 'CREATED' | 'ACCEPTED' | 'DRIVERASSIGNED' | 'DELIVERING' | 'DONE' | 'CANCELED' | undefined;
  dishes: Dish[];
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

export interface OrderTableState {
  data: Order[];
  pagination: Pagination;
  sort: any,
  filter: any,
  loading: boolean;
  error: string | null;
};

export interface OrderTablePayload {
  data: ListOrderResponse;
  isAutoFetching?: boolean;
};


// Order modal types
export interface OrderModalResponse {
  status: string | null;
  data: Order;
}

export interface OderModalState {
  isShow: boolean;
  isEdit: boolean;
  data: Order;
  dishesOptionData: Dish[];
  selectedDishes: string | undefined;
  dishesQuantity: number | undefined;
  loading: boolean;
  error: string | null;
};

export interface OpenOrderModalPayload {
  isEdit: boolean;
  data: Order;
};
