import { combineReducers } from '@reduxjs/toolkit';
import { reducer as form } from 'redux-form';

import chartReducer from '../components/Dashboard/Chart/reducer';

import dishesReducer from '../components/Dishes/DishesTable/reducer';
import dishesModalReducer from '../components/Dishes/DishesModal/reducer';

import orderReducer from '../components/Order/OrderTable/reducer';
import orderModalReducer from '../components/Order/OrderModal/reducer';

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
  chartReducer,
  dishesPage,
  orderPage

});

export default rootReducer;
