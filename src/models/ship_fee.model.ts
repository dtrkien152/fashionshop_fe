export interface IShipFee {
  id: number;
  name: string;
  triggerPrice: number;
  fee: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
