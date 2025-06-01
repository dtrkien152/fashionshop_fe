import { createSlice } from '@reduxjs/toolkit';

export interface IVoucherState {
  vouchers: any[];
}
const initialState: IVoucherState = {
  vouchers: [],
};
const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    addVoucher: (state, action) => {
      state.vouchers.push(action.payload);
    }
  },
});
export const { setVouchers, addVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
