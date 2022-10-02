import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { AppThunk } from '~/redux/store';
import { defaultPageSize } from '~/constants/appConstant';

import { Pagination } from '~/types/Common';
import { DishTableState, DishTablePayload } from '~/types/Dish';

import { getDishes } from '~/api/dishes.api';

const initialState: DishTableState = {
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

const dishesTable = createSlice({
	name: 'dishTable',
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
		},
		getDishesStart(state) {
			state.loading = true;
			state.error = null;
		},
		getDishesSuccess(state, action: PayloadAction<DishTablePayload>) {
			const { data, isAutoFetching } = action.payload;

			state.data = data.data;
			state.loading = false;
			state.error = null;
			if (!isAutoFetching) { state.pagination = data.pagination; }
		},
		getDishesFailure(state, action: PayloadAction<string>) {
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
	getDishesStart,
	getDishesSuccess,
	getDishesFailure,
	resetData
} = dishesTable.actions;
export default dishesTable.reducer;

export const fetchDishes = (options: any | { isShowLoading: true; isAutoFetching: false; }): AppThunk => async (dispatch, getState) => {
	try {
		if (options.isShowLoading) {
			dispatch(getDishesStart());
		}
		const { pagination: { page, pageSize }, sort, filter } = getState().dishPage.dishTableReducer;
		const dishesData = await getDishes({ page, pageSize, sort, filter });
		dispatch(getDishesSuccess({ data: dishesData, isAutoFetching: options.isAutoFetching }));
	} catch (err: any) {
		notification.error({ message: err.message });
		dispatch(getDishesFailure(err));
	}
};
