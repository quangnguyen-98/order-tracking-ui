import { combineReducers } from '@reduxjs/toolkit';
import { reducer as form } from 'redux-form';

import dashboardChartReducer from '~/components/Dashboard/Chart/reducer';

import dishTableReducer from '~/components/Dish/DishTable/reducer';
import dishModalReducer from '~/components/Dish/DishModal/reducer';

import orderTableReducer from '~/components/Order/OrderTable/reducer';
import orderModalReducer from '~/components/Order/OrderModal/reducer';

const dishPage = combineReducers({
  dishTableReducer,
  dishModalReducer,
});

const orderPage = combineReducers({
  orderTableReducer,
  orderModalReducer
});

const rootReducer = combineReducers({
  form,
  dashboardChartReducer,
  dishPage,
  orderPage
});

export default rootReducer;
