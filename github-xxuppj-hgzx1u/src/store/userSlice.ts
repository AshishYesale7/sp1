import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/movie';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addToWatchlist: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.watchlist = state.currentUser.watchlist.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  addToWatchlist,
  removeFromWatchlist,
} = userSlice.actions;
export default userSlice.reducer;