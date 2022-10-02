import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { AppThunk } from '~/redux/store';

import { DashboardPayload, DashboardState } from '~/types/Dashboard';

import { getDashboard } from '~/api/dashboard.api';



const initialState: DashboardState = {
	countOrderByStatus: 0,
	countOrderByTiming: 0,
	orderByStatusChart: {
		labels: [],
		series: []
	},
	orderByTimingChart: {
		labels: [],
		series: []
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
		getDashboardSuccess(state, action: PayloadAction<DashboardPayload>) {
			const { data } = action.payload;
			state.countOrderByStatus = data.countOrderByStatus;
			state.countOrderByTiming = data.countOrderByTiming;
			state.orderByStatusChart = data.orderByStatusChart;
			state.orderByTimingChart = data.orderByTimingChart;
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

export const fetchDashboard = (options: any): AppThunk => async dispatch => {
	try {
		if (options.isShowLoading) {
			dispatch(getDashboardStart());
		}

		const dashboardData = await getDashboard();
		dispatch(getDashboardSuccess({ data: dashboardData }));
	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
		dispatch(getDishesFailure(err));
	}
};

