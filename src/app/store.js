import { configureStore } from '@reduxjs/toolkit';
import favReducer from '../features/favMovieSlice'

export const store = configureStore({
  reducer: {
    favorites: favReducer
  },
});
