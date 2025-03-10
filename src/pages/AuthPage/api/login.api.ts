import api from "~/config/axiosConfig.ts";

export const loginPage = (email:string, password: string) =>
{
    const payload={
        email,
        password
    }
   return api.post(`api/auth/sign-in`,payload);
}
