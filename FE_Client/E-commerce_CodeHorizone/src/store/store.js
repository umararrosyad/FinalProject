import { configureStore } from '@reduxjs/toolkit';

import sideReducer from './reducers/sideLocation';
import searchRedcer from './reducers/search';
import productReducer from './reducers/product';
export const store = configureStore({
    reducer: {
        sidebar: sideReducer,
        search : searchRedcer,
        product : productReducer
    },
  });
  
  export default store;