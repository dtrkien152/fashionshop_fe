import { BASE_URL, httpService } from '~/services/index.ts';

export const authService = {
  login: (email: string, password: string) => {
    const payload = {
      email,
      password,
    };
    return httpService.post(BASE_URL + '/api/auth/sign-in', payload);
  },  register: (email:string,password:string) => {
    const payload = {
      email,
      password,
    };
    return httpService.post(BASE_URL + '/api/auth/sign-up', payload);
  },
  googleCallback: (code:string) => {
    return httpService.post(BASE_URL + '/api/auth/google/callback?code=' + code);
  },getUserAuth:(token:string)=>{
    httpService.attachTokenToHeaderCustom(token)
    return httpService.get(BASE_URL+'/api/auth/me')
  }
};
export default authService;
