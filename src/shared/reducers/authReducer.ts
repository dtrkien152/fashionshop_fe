// src/shared/reducer/authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromStorage, saveUserToStorage, clearUserStorage } from '../utils/localStorageUtil';
import { UserState } from '~/shared/model/User.model';

const initialState: UserState = getUserFromStorage() || {
    id: null,
    email: null,
    fullName: null,
    role: null,
    avatar: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<UserState>) => {
            Object.assign(state, action.payload);
            saveUserToStorage(state);
        },
        logout: (state) => {
            Object.assign(state, {
                id: null,
                email: null,
                role: null,
                token: null,
                avatar: null,
                fullName:null
            });
            clearUserStorage();
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
