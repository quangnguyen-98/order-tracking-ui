import { combineReducers } from '@reduxjs/toolkit'

import merchantReducer from '../containers/Merchant/reducer';

const rootReducer = combineReducers({
  merchantReducer: merchantReducer,
})


export default rootReducer;
