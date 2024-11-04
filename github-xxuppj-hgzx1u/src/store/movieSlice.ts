import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../types/movie';

interface MovieState {
  trending: Movie[];
  featured: Movie[];
  watchlist: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  trending: [],
  featured: [],
  watchlist: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setTrending: (state, action: PayloadAction<Movie[]>) => {
      state.trending = action.payload;
    },
    setFeatured: (state, action: PayloadAction<Movie[]>) => {
      state.featured = action.payload;
    },
    setWatchlist: (state, action: PayloadAction<Movie[]>) => {
      state.watchlist = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTrending,
  setFeatured,
  setWatchlist,
  setLoading,
  setError,
} = movieSlice.actions;
export default movieSlice.reducer;