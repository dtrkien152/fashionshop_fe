// src/shared/reducer/authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromStorage, saveUserToStorage, clearUserStorage } from '../utils/localStorageUtil';
import {UserState} from "~/shared/model/User.model.ts";

const initialState = getUserFromStorage() || {
    id: null,
    email: null,
    role: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            Object.assign(state, action.payload);
            saveUserToStorage(state);
        },
        logout: (state) => {
            Object.assign(state, { id: null, email: null, role: null, token: null });
            clearUserStorage();
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
