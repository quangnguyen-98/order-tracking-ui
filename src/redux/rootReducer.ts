import { combineReducers } from '@reduxjs/toolkit';
import { reducer as form } from 'redux-form';
import dishesReducer from '../components/MerChant/DishesTable/reducer';
import dishesModalReducer from '../components/MerChant/DishesModal/reducer';

import orderReducer from '../components/User/OrderTable/reducer';
import orderModalReducer from '../components/User/OrderModal/reducer';

const dishesPage = combineReducers({
  dishesReducer,
  dishesModalReducer,
});

const orderPage = combineReducers({
  orderReducer,
  orderModalReducer
});

const rootReducer = combineReducers({
  form,
  dishesPage,
  orderPage

});

export default rootReducer;
