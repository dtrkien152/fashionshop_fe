import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageUtils } from '~/utils';

export interface IUserState {
    id?: number | null;
    email?: string | null;
    role?: string | null;
    token?: string | null;
    avatar?: string | null;
    fullName?: string | null;
    phone?: string | null;
    isLoggedIn?: boolean;
}

const initialState: IUserState = LocalStorageUtils.getUserFromStorage() || {
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
        login: (state, action: PayloadAction<IUserState>) => {
            Object.assign(state, action.payload);
            state.isLoggedIn = true;
            LocalStorageUtils.saveUserToStorage(state);
        },
        logout: (state) => {
            Object.assign(state, {
                id: null,
                email: null,
                role: null,
                token: null,
                avatar: null,
                fullName: null,
            });
            state.isLoggedIn = false;
            LocalStorageUtils.clearUserStorage();
        },
        updateAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
            LocalStorageUtils.saveUserToStorage(state);
        },
    },
});

export const { login, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
