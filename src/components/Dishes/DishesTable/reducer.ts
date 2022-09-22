import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AppThunk } from '../../../redux/store';
import { Pagination } from '../../../types/Common';
import { defaultPageSize } from '../../../constants/appConstant';
import { Dishes, DishesPayload } from '../../../types/Dishes';

import { getDishes } from '../../../api/dishes.api';

interface DishesState {
	data: Dishes[];
	pagination: Pagination;
	sort: any,
	filter: any,
	loading: boolean;
	error: string | null;
};

const initialState: DishesState = {
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
	name: 'dishesTable',
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
		getDishesSuccess(state, action: PayloadAction<DishesPayload>) {
			const { data } = action.payload;

			state.data = data.data;
			state.pagination = data.pagination;
			state.loading = false;
			state.error = null;
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

export const fetchDishes = (params: any | {}, options: any | { isShowLoading: true; }): AppThunk => async dispatch => {
	try {
		if (options.isShowLoading) {
			dispatch(getDishesStart());
		}
		const dishesData = await getDishes(params);
		dispatch(getDishesSuccess({ data: dishesData }));
	} catch (err: any) {
		notification.error({ message: err.message });
		dispatch(getDishesFailure(err));
	}
};
