import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, cartReducer, siteReducer } from '~/redux/index.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  site: siteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
