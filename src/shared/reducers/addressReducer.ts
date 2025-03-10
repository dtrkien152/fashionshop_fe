import { createSlice } from '@reduxjs/toolkit';

export interface IAddressState {
  address: any[];
}
const initialState: IAddressState = {
  address: [],
};
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    addAddress: (state, action) => {
      state.address.push(action.payload);
    }
  },
});
export const {  } = addressSlice.actions;
export default addressSlice.reducer;
