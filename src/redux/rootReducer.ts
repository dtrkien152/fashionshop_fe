import { combineReducers } from '@reduxjs/toolkit';
import { authReducer, cartReducer } from '~/redux/index.ts';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
