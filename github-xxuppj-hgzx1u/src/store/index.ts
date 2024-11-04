import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import authReducer from '../services/auth';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;