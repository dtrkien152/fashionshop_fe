import { IUserState } from '~/redux';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export const LocalStorageUtils = {
  getUserFromStorage: (): IUserState | null => {
    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    return user && token ? { ...JSON.parse(user), token } : null;
  },
  saveUserToStorage: (user: IUserState) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, user.token ?? '');
  },
  clearUserStorage: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
};
