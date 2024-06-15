import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sideLocation: "dashboard",
    productLocation: "product"
  },
  reducers: {
    setSideLocation: (state, action) => {
      state.sideLocation = action.payload
    },
    setProductLocation: (state, action) => {
      state.productLocation = action.payload
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { setSideLocation, setProductLocation } = counterSlice.actions;
export default counterSlice.reducer;