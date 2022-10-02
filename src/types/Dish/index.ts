import { Pagination } from '../Common';

// Dish table types
export interface Dish {
	_id: string | undefined;
	name: string | undefined;
	price: number | undefined;
	quantity?: number | undefined;
	createdDate?: string | null;
	updatedDate?: string | null;
}

export interface ListDishResponse {
	data: Dish[];
	pagination: Pagination;
}

export interface DishTableState {
	data: Dish[];
	pagination: Pagination;
	sort: any,
	filter: any,
	loading: boolean;
	error: string | null;
};

export interface DishTablePayload {
	data: ListDishResponse;
	isAutoFetching?: boolean;
};


// Dish modal types
export interface DishModalResponse {
	status: string | null;
	data: Dish;
}

export interface DishModalState {
	isShow: boolean;
	isEdit: boolean;
	data: Dish;
	loading: boolean;
	error: string | null;
};

export interface OpenDishModalPayload {
	isEdit: boolean;
	data: Dish;
};
