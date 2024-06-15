import { createSlice } from "@reduxjs/toolkit";

const searchTerm = createSlice({
  name: "product",
  initialState: {
    product_detail: [],
  },
  reducers: {
    fillProduct: (state, action) => { 
      const newItems = [...state.product_detail];
      newItems.push(action.payload);
      state.product_detail = newItems;
    },
    removeProduct: (state, action) => {
      state.category = action.payload;
      const updatedProduct = state.product_detail.filter(item => item.product_variant_id !== action.payload.product_variant_id);
      state.product_detail = updatedProduct;
    },

    updateProduct: (state, action) => {
      state.category = action.payload;
      const updatedProduct = state.product_detail.filter(item => item.product_variant_id !== action.payload.product_variant_id);
      const newItems = [...updatedProduct];
      newItems.push(action.payload);
      state.product_detail = newItems;
    },
    clearProduct: (state) => {
        state.product_detail =[]
    }
  },
});

export const { fillProduct, removeProduct, updateProduct, clearProduct } = searchTerm.actions;
export default searchTerm.reducer;
