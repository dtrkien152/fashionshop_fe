export interface IOtp {
  id?: number;
  userId?: number;
  code?: string;
  action?: string;
  expired?: Date;
  isUsed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

