export interface IUser {
  id?: number;
  code?: string;
  email?: string;
  password?: string;
  fullName?: string;
  gender?: boolean;
  phone?: string;
  avatar?: string;
  role?: string;
  googleId?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
