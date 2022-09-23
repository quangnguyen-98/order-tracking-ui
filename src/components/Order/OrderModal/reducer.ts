import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { AppThunk } from '../../../redux/store';
import { fetchOrder } from '../OrderTable/reducer';

import { OrderStatuses } from '../../../constants/appConstant';

import { UpdateFormValuePayload } from '../../../types/Common';
import { Dishes, DishesPayload } from '../../../types/Dishes';
import { Order } from '../../../types/Order';

import { postOrders, putOrders } from '../../../api/order.api';
import { getDishes } from '../../../api/dishes.api';

const { CREATED } = OrderStatuses;


interface OderModalState {
	isShow: boolean;
	isEdit: boolean;
	data: Order;
	dishesOptionData: Dishes[];
	selectedDishes: string | undefined;
	dishesQuantity: number | undefined;
	loading: boolean;
	error: string | null;
};

export interface OpenModalPayload {
	isEdit: boolean;
	data: Order;
};


const initialState: OderModalState = {
	isShow: false,
	isEdit: false,
	data: {
		_id: undefined,
		address: undefined,
		orderName: undefined,
		merchantAddress: undefined,
		merchantName: undefined,
		riderName: undefined,
		status: CREATED,
		dishes: [],
		totalPrice: 0,
		createdDate: null,
		updatedDate: null,
		statusUpdatedDate: null
	},
	dishesOptionData: [
	],
	selectedDishes: undefined,
	dishesQuantity: 1,
	loading: false,
	error: null
};

const orderModal = createSlice({
	name: 'orderModal',
	initialState,
	reducers: {
		getAllDishesSuccess(state, action: PayloadAction<DishesPayload>) {
			const { data } = action.payload;

			state.dishesOptionData = data.data;
			state.selectedDishes = data.data[0]._id;
		},
		onChangeDishesSelectOption(state, action: PayloadAction<string>) {
			state.selectedDishes = action.payload;
		},
		onChangedishesQuantity(state, action: PayloadAction<number>) {
			state.dishesQuantity = action.payload;
		},
		openOrderModalCreate(state) {
			state.isShow = true;
			state.isEdit = false;
		},
		openOrderModalEdit(state, action: PayloadAction<OpenModalPayload>) {
			const { isEdit, data } = action.payload;
			state.isShow = true;
			state.isEdit = isEdit;
			state.data = data;
		},
		onChangeOrderFormValue(state, action: PayloadAction<UpdateFormValuePayload>) {
			const { fieldName, value } = action.payload;
			switch (fieldName) {
				case 'address':
					state.data.address = value;
					break;
				case 'merchantAddress':
					state.data.merchantAddress = value;
					break;
				case 'merchantName':
					state.data.merchantName = value;
					break;
				case 'totalPrice':
					state.data.totalPrice = Number(value);
					break;
				case 'dishes':
					state.data.dishes = value;
					state.data.totalPrice = state.data.dishes.reduce((total, currentDishes) => total + (currentDishes.price! * currentDishes.quantity!), 0);
					state.dishesQuantity = 1;
					break;
				case 'orderName':
					state.data.orderName = value;
					break;
				case 'status':
					state.data.status = value;
					break;
				case 'riderName':
					state.data.riderName = value;
					break;
				default:
					break;
			}
		},
		createUpdateOrderStart(state) {
			state.loading = true;
			state.error = null;
		},
		createOrderSuccess() {
			return initialState;
		},
		updateOrderSuccess(state) {
			return initialState;
			// state.loading = false;
			// state.error = null;
		},
		createUpdateOrderFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		resetData() {
			return initialState;
		}
	}
});

export const {
	getAllDishesSuccess,
	onChangeDishesSelectOption,
	onChangedishesQuantity,
	onChangeOrderFormValue,
	openOrderModalCreate,
	openOrderModalEdit,
	createUpdateOrderStart,
	createOrderSuccess,
	updateOrderSuccess,
	createUpdateOrderFailure,
	resetData
} = orderModal.actions;
export default orderModal.reducer;

//Acsync Action
export const createOrder = (options: any | {}): AppThunk => async (dispatch, getState) => {
	try {
		dispatch(createUpdateOrderStart());
		await postOrders(options);
		notification.success({ message: 'Created order successfully' });
		dispatch(createOrderSuccess());

		dispatch(fetchOrder({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
		dispatch(createUpdateOrderFailure(err));
	}
};

export const updateOrder = (options: any | {}): AppThunk => async (dispatch) => {
	try {
		dispatch(createUpdateOrderStart());
		await putOrders(options);
		dispatch(updateOrderSuccess());
		notification.success({ message: 'Updated order successfully' });
		
		dispatch(fetchOrder({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
		dispatch(createUpdateOrderFailure(err));
	}
};


export const getAllDishes = (): AppThunk => async (dispatch, getState) => {
	try {
		const options: any = {
			sort: {},
			filter: {},
			page: 0,
			pageSize: 100
		};
		const dishesData = await getDishes(options);
		dispatch(getAllDishesSuccess({ data: dishesData }));

	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
	}
};