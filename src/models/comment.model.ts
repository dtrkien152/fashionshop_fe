export interface IComment {
  id?: number;
  userId?: number;
  blogId?: number;
  content?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

