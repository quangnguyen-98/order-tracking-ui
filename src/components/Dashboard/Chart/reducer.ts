import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AppThunk } from '../../../redux/store';

import { getDashboard } from '../../../api/dashboard.api';

interface DishesState {
	orderByStatus: any;
	orderByTiming: any;
	loading: boolean;
	error: string | null;
};

const initialState: DishesState = {
	orderByStatus: {
		count: 0,
		chartData: {
			labels: [],
			series: []
		}
	},
	orderByTiming: {
		count: 0,
		chartData: {
			labels: [],
			series: []
		}
	},
	loading: false,
	error: null
};

const dishesTable = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		getDashboardStart(state) {
			state.loading = true;
			state.error = null;
		},
		getDashboardSuccess(state, action: PayloadAction<any>) {
			const { data } = action.payload;
			state.orderByStatus = data.orderByStatus;
			state.orderByTiming = data.orderByTiming;
			state.loading = false;
			state.error = null;
		},
		getDashboardFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		resetData() {
			return initialState;
		}
	}
});

export const {
	getDashboardStart,
	getDashboardSuccess,
	getDashboardFailure: getDishesFailure,
	resetData
} = dishesTable.actions;
export default dishesTable.reducer;

export const fetchDashboard = (): AppThunk => async dispatch => {
	try {
		dispatch(getDashboardStart());
		const dashboard = await getDashboard();
		dispatch(getDashboardSuccess({ data: dashboard }));
	} catch (err: any) {
		notification.error({ message: err.message });
		dispatch(getDishesFailure(err));
	}
};
