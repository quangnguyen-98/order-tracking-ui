import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AppThunk } from '../../../redux/store';

import { defaultPageSize } from '../../../constants/appConstant';

import { Pagination } from '../../../types/Common';
import { Order, ListOrderResponse } from '../../../types/Order';

import { getOrders } from '../../../api/order.api';

interface OrderState {
    data: Order[];
    pagination: Pagination;
    sort: any,
    filter: any,
    loading: boolean;
    error: string | null;
};

interface OrderPayload {
    data: ListOrderResponse;
};

const initialState: OrderState = {
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
        getOrderStart(state) {
            state.loading = true;
            state.error = null;
        },
        getOrderSuccess(state, action: PayloadAction<OrderPayload>) {
            const { data } = action.payload;

            state.data = data.data;
            state.pagination = data.pagination;
            state.loading = false;
            state.error = null;
        },
        getOrderFailure(state, action: PayloadAction<string>) {
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
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    resetData
} = orderTable.actions;

export default orderTable.reducer;

export const fetchOrder = (options: any | { isShowLoading: true; }): AppThunk => async (dispatch, getState) => {
    try {
        if (options.isShowLoading) {
            dispatch(getOrderStart());
        }
        const { pagination: { page, pageSize }, sort, filter } = getState().orderPage.orderReducer;
        const orderData = await getOrders({ page, pageSize, sort, filter });
        dispatch(getOrderSuccess({ data: orderData }));
    } catch (err: any) {
        notification.error({ message: err.message });
        dispatch(getOrderFailure(err));
    }
};
