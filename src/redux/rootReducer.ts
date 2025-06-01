import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, cartReducer, siteReducer, voucherReducer } from '~/redux/index.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  site: siteReducer,
  voucher: voucherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
