import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { defaultPageSize } from '~/constants/appConstant';

import { AppThunk } from '~/redux/store';

import { Pagination } from '~/types/Common';
import { OrderTableState, OrderTablePayload } from '~/types/Order';

import { getOrders } from '~/api/order.api';

const initialState: OrderTableState = {
	data: [],
	pagination: {
		page: 0,
		pageSize: defaultPageSize,
		totalPage: 0,
		totalItem: 0
	},
	sort: {},
	filter: {},
	loading: false,
	error: null
};

const orderTable = createSlice({
	name: 'orderTable',
	initialState,
	reducers: {
		updatePagination(state, action: PayloadAction<Pagination>) {
			state.pagination = action.payload;
		},
		updateSort(state, action: PayloadAction<any>) {
			state.sort = action.payload;
		},
		updateFilter(state, action: PayloadAction<any>) {
			state.filter = action.payload;
			state.pagination.page = 0;
		},
		getOrdersStart(state) {
			state.loading = true;
			state.error = null;
		},
		getOrdersSuccess(state, action: PayloadAction<OrderTablePayload>) {
			const { data, isAutoFetching } = action.payload;
			state.data = data.data;
			state.loading = false;
			state.error = null;
			if (!isAutoFetching) { state.pagination = data.pagination; }
		},
		getOrdersFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		resetData() {
			return initialState;
		}
	}
});

export const {
	updatePagination,
	updateSort,
	updateFilter,
	getOrdersStart,
	getOrdersSuccess,
	getOrdersFailure,
	resetData
} = orderTable.actions;

export default orderTable.reducer;

export const fetchOrders = (options: any | { isShowLoading: true; isAutoFetching: false; }): AppThunk => async (dispatch, getState) => {
	try {
		if (options.isShowLoading) {
			dispatch(getOrdersStart());
		}
		const { pagination: { page, pageSize }, sort, filter } = getState().orderPage.orderTableReducer;
		const orderData = await getOrders({ page, pageSize, sort, filter });
		dispatch(getOrdersSuccess({ data: orderData, isAutoFetching: options.isAutoFetching }));
	} catch (err: any) {
		notification.error({ message: err.message });
		dispatch(getOrdersFailure(err));
	}
};
