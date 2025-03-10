import { BASE_URL, httpService } from '~/services/index.ts';

export const authService = {
  login: (email: string, password: string) => {
    const payload = {
      email,
      password,
    };
    return httpService.post(BASE_URL + '/api/auth/sign-in', payload);
  },
};
export default authService;
