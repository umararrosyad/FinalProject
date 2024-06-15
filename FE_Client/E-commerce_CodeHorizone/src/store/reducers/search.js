import { createSlice } from "@reduxjs/toolkit";

const searchTerm = createSlice({
  name: "search",
  initialState: {
    name: "",
    category: "",
    short: "",
    limit : ""
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setShort: (state, action) => {
      state.short = action.payload;
    },
    setLimit: (state, action) => {
        state.limit = action.payload;
      },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { setName, setCategory, setLimit, setShort } = searchTerm.actions;
export default searchTerm.reducer;
