export interface UserState {
    id?: number | null;
    email?: string | null;
    role?: string | null;
    token?: string | null;
    avatar?:string | null;
    fullName?:string | null;
}