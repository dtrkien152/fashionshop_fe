// src/shared/utils/localStorageUtil.ts

import { IUserState } from '~/shared/reducers/authReducer.ts';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export const getUserFromStorage = (): IUserState | null => {
    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    return user && token ? { ...JSON.parse(user), token } : null;
};

export const saveUserToStorage = (user: IUserState) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, user.token ?? '');
};

export const clearUserStorage = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
};
