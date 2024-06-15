import { configureStore } from '@reduxjs/toolkit';
import sideReducer from './reducers/sideLocation';

export const store = configureStore({
    reducer: {
        sidebar: sideReducer,
    },
  });
  
  export default store;