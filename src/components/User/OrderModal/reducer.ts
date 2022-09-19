import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { postOrders, putOrders } from '../../../api/order.api';
import { Order } from '../../../types/User';
import { fetchOrder } from '../../../containers/User/reducer';
import { AppThunk } from '../../../redux/store';

interface OderModalState {
    isShow: boolean;
    isEdit: boolean;
    data: Order;
    loading: boolean;
    error: string | null;
};

export interface OpenModalPayload {
    isEdit: boolean;
    data: Order;
};

export interface updateFormValuePayload {
    fieldName: string;
    value: any;
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
        status: 'CREATED',
        dishes: [
            {
                name: 'banh canh',
                price: 12000
            }
        ],
        totalPrice: undefined,
        createdDate: null,
        updatedDate: null
    },
    loading: false,
    error: null
};

const orderModal = createSlice({
    name: 'orderModal',
    initialState,
    reducers: {
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
        onChangeOrderFormValue(state, action: PayloadAction<updateFormValuePayload>) {
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
                    state.data.totalPrice = value;
                    break;
                case 'dishes':
                    state.data.dishes = value;
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
            state.loading = false;
            state.error = null;
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

        const { pagination: { page, pageSize }, sort, filter } = getState().orderReducer;
        dispatch(fetchOrder({ sort, filter, page, pageSize }));
    } catch (err: any) {
        notification.error({ message: err.response.data.message || err.message });
        dispatch(createUpdateOrderFailure(err));
    }
};

export const updateOrder = (options: any | {}): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(createUpdateOrderStart());
        await putOrders(options);
        dispatch(updateOrderSuccess());
        notification.success({ message: 'Updated order successfully' });

        const { pagination: { page, pageSize }, sort, filter } = getState().orderReducer;
        dispatch(fetchOrder({ sort, filter, page, pageSize }));
    } catch (err: any) {
        notification.error({ message: err.response.data.message || err.message });
        dispatch(createUpdateOrderFailure(err));
    }
};
