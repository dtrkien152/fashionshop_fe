// src/shared/reducer/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import cartReducer from '~/shared/reducers/cartReducer.ts';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
