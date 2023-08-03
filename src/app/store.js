import { configureStore } from '@reduxjs/toolkit';
import favReducer from '../features/favMovieSlice'
import authReducer from '../features/authSlice';
export const store = configureStore({
  reducer: {
    favorites: favReducer,
     auth: authReducer,
  },
});
