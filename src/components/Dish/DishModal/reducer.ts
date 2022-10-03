import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { AppThunk } from '~/redux/store';
import { fetchDishes } from '../DishTable/reducer';

import { UpdateFormValuePayload } from '~/types/Common';
import { DishModalState, OpenDishModalPayload } from '~/types/Dish';

import { postDish, putDish } from '~/api/dishes.api';

const initialState: DishModalState = {
	isShow: false,
	isEdit: false,
	data: {
		_id: undefined,
		name: undefined,
		price: undefined,
		createdDate: null,
		updatedDate: null
	},
	loading: false,
	error: null
};

const dishesModal = createSlice({
	name: 'dishModal',
	initialState,
	reducers: {
		openDishModalCreate(state) {
			state.isShow = true;
			state.isEdit = false;
		},
		openDishModalEdit(state, action: PayloadAction<OpenDishModalPayload>) {
			const { isEdit, data } = action.payload;
			state.isShow = true;
			state.isEdit = isEdit;
			state.data = data;
		},
		onChangeDishesFormValue(state, action: PayloadAction<UpdateFormValuePayload>) {
			const { fieldName, value } = action.payload;
			switch (fieldName) {
				case 'name':
					state.data.name = value;
					break;
				case 'price':
					state.data.price = value;
					break;
				default:
					break;
			}
		},
		createUpdateDishStart(state) {
			state.loading = true;
			state.error = null;
		},
		createDishSuccess() {
			return initialState;
		},
		updateDishSuccess(state) {
			// state.loading = false;
			// state.error = null;
			return initialState;
		},
		createUpdateDishFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		resetData() {
			return initialState;
		}
	}
});

export const {
	onChangeDishesFormValue,
	openDishModalCreate,
	openDishModalEdit,
	createUpdateDishStart,
	createDishSuccess,
	updateDishSuccess,
	createUpdateDishFailure,
	resetData
} = dishesModal.actions;
export default dishesModal.reducer;

//Async Action
export const createDish = (options: any | {}): AppThunk => async (dispatch) => {
	try {
		dispatch(createUpdateDishStart());
		await postDish(options);
		notification.success({ message: 'Created dishes successfully' });
		dispatch(createDishSuccess());

		dispatch(fetchDishes({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response?.data?.message || err.message });
		dispatch(createUpdateDishFailure(err));
	}
};

export const updateDish = (options: any | {}): AppThunk => async (dispatch) => {
	try {
		dispatch(createUpdateDishStart());
		await putDish(options);
		dispatch(updateDishSuccess());
		notification.success({ message: 'Updated dishes successfully' });

		dispatch(fetchDishes({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response?.data?.message || err.message });
		dispatch(createUpdateDishFailure(err));
	}
};
