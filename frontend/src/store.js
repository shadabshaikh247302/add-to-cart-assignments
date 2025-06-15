import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../src/slices/AddToCartSlice.js'; 
export const store = configureStore({
    reducer:{
         products: productReducer,
    }
}) 

