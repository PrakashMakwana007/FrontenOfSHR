import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theamSlice';
import authReducer from './authSlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';
import cartReducer from './cartSlice';
const store = configureStore({
  reducer: {
    theme: themeReducer,   
    auth: authReducer,
    menu: menuReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});

export default store;
