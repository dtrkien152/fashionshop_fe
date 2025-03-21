import { BASE_URL, httpService } from '~/services/index.ts';

export const authService = {
  login: (email: string, password: string) => {
    const payload = {
      email,
      password,
    };
    return httpService.post(BASE_URL + '/api/auth/sign-in', payload);
  },
  register: (email: string, password: string) => {
    const payload = {
      email,
      password,
    };
    return httpService.post(BASE_URL + '/api/auth/sign-up', payload);
  },
  googleCallback: (code: string) => {
    return httpService.post(BASE_URL + '/api/auth/google/callback?code=' + code);
  },
  getUserAuth: (token: string) => {
    httpService.attachTokenToHeader(token);
    return httpService.get(BASE_URL + '/api/auth/me');
  },
  changePassword: (oldPassword: string, newPassword: string) => {
    httpService.attachTokenToHeader();
    const payload = {
      oldPassword,
      newPassword,
    };
    return httpService.put(BASE_URL + '/api/auth/change-password', payload);
  },
  sendMailForgotPassword: (email: string) => {
    return httpService.post(BASE_URL + '/api/auth/forgot-password/send-mail', { email });
  },
  resetForgotPassword: (email: string, code: string, newPassword: string) => {
    return httpService.post(BASE_URL + '/api/auth/forgot-password/reset-password', { email, code, newPassword });
  },
};
export default authService;
