import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { getProducts } from '../../api/user.api';
import { Product } from '../../types/Merchant/Product';
import { AppThunk } from '../../redux/store';

interface ProductsState {
    products: Product[]
    loading: boolean
    error: string | null
}

interface ProductLoaded {
    products: Product[]
}

const initialState: ProductsState = {
    products: [
        { id: '1', name: 'quang', price: 11, quantity: 1, createdAt: 'gfgfdg', avatar: 'gfdgd' }
    ],
    loading: false,
    error: null
}

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductsStart(state) {
            state.loading = true
            state.error = null
        },
        getProductsSuccess(state, action: PayloadAction<ProductLoaded>) {
            const { products } = action.payload
            state.products = products;
            state.loading = false
            state.error = null
        },
        getProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure
} = products.actions
export default products.reducer

// export const fetchProducts = (name: string): AppThunk => async dispatch => {
//     try {
//         dispatch(getProductsStart())
//         const products = await getProducts();
//         dispatch(getProductsSuccess({ products }))
//     } catch (err: any) {
//         dispatch(getProductsFailure(err))
//     }
// }

export const fetchProducts = (): AppThunk => async dispatch => {
    try {
        dispatch(getProductsStart())
        const products = await getProducts();
        dispatch(getProductsSuccess({ products }))
    } catch (err: any) {
        dispatch(getProductsFailure(err))
    }
}

// export const fetchUserById = createAsyncThunk(



//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )