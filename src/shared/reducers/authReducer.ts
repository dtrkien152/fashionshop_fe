// src/shared/reducer/authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromStorage, saveUserToStorage, clearUserStorage } from '../utils/localStorageUtil';

export interface IUserState {
    id?: number | null;
    email?: string | null;
    role?: string | null;
    token?: string | null;
    avatar?:string | null;
    fullName?:string | null;
    phone?:string | null;
    isLoggedIn?:boolean;
}

const initialState: IUserState = getUserFromStorage() || {
    id: null,
    email: null,
    fullName: null,
    role: null,
    avatar: null,
    token: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: IUserState, action: PayloadAction<IUserState>) => {
            Object.assign(state, action.payload);
            state.isLoggedIn = true;
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
            state.isLoggedIn = false;
            clearUserStorage();
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
