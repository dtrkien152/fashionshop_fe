import { createSlice } from '@reduxjs/toolkit';
import { ISite } from '~/models';

export interface ISiteState {
  sites: ISite[];
  siteSelected: ISite | null
}

const initialState: ISiteState = {
  sites: [],
  siteSelected: null
};
const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSites: (state, action) => {
      state.sites = action.payload;
      state.siteSelected = action.payload[0];
    },
    setSiteSelected: (state, action) => {
      state.siteSelected = action.payload;
    }
  },
});
export const { setSites, setSiteSelected } = siteSlice.actions;
export default siteSlice.reducer;
