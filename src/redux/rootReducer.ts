import { combineReducers } from '@reduxjs/toolkit';
import { reducer as form } from 'redux-form';
import dishesReducer from '../containers/Merchant/reducer';
import dishesModalReducer from '../components/MerChant/DishesModal/reducer';

import orderReducer from '../containers/User/reducer';
import orderModalReducer from '../components/User/OrderModal/reducer';



const rootReducer = combineReducers({
  form,
  dishesReducer,
  dishesModalReducer,
  orderReducer,
  orderModalReducer
  
});

export default rootReducer;
