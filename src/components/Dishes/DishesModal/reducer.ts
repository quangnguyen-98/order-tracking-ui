import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AppThunk } from '../../../redux/store';
import { fetchDishes } from '../DishesTable/reducer';

import { UpdateFormValuePayload } from '../../../types/Common';
import { Dishes } from '../../../types/Dishes';

import { postDishes, putDishes } from '../../../api/dishes.api';


interface DishesModalState {
	isShow: boolean;
	isEdit: boolean;
	data: Dishes;
	loading: boolean;
	error: string | null;
};

export interface OpenModalPayload {
	isEdit: boolean;
	data: Dishes;
};


const initialState: DishesModalState = {
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
	name: 'dishesModal',
	initialState,
	reducers: {
		openDishesModalCreate(state) {
			state.isShow = true;
			state.isEdit = false;
		},
		openDishesModalEdit(state, action: PayloadAction<OpenModalPayload>) {
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
		createUpdateDishesStart(state) {
			state.loading = true;
			state.error = null;
		},
		createDishesSuccess() {
			return initialState;
		},
		updateDishesSuccess(state) {
			// state.loading = false;
			// state.error = null;
			return initialState;
		},
		createUpdateDishesFailure(state, action: PayloadAction<string>) {
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
	openDishesModalCreate,
	openDishesModalEdit,
	createUpdateDishesStart,
	createDishesSuccess,
	updateDishesSuccess,
	createUpdateDishesFailure,
	resetData
} = dishesModal.actions;
export default dishesModal.reducer;

//Acsync Action
export const createDishes = (options: any | {}): AppThunk => async (dispatch) => {
	try {
		dispatch(createUpdateDishesStart());
		await postDishes(options);
		notification.success({ message: 'Created dishes successfully' });
		dispatch(createDishesSuccess());

		dispatch(fetchDishes({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
		dispatch(createUpdateDishesFailure(err));
	}
};

export const updateDishes = (options: any | {}): AppThunk => async (dispatch) => {
	try {
		dispatch(createUpdateDishesStart());
		await putDishes(options);
		dispatch(updateDishesSuccess());
		notification.success({ message: 'Updated dishes successfully' });

		dispatch(fetchDishes({ isShowLoading: false }));
	} catch (err: any) {
		notification.error({ message: err.response.data.message || err.message });
		dispatch(createUpdateDishesFailure(err));
	}
};