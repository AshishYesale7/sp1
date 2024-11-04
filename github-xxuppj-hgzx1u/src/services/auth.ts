import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: 'admin' | 'user';
    settings: {
      wifiOnly: boolean;
      notifications: boolean;
      autoPlay: boolean;
    };
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Default admin credentials
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = '1234';

export const login = (email: string, password: string) => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: 'admin-id',
      email: ADMIN_EMAIL,
      role: 'admin' as const,
      settings: {
        wifiOnly: true,
        notifications: true,
        autoPlay: true,
      },
    };
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<AuthState['user']['settings']>>) => {
      if (state.user) {
        state.user.settings = { ...state.user.settings, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateSettings, logout } = authSlice.actions;
export default authSlice.reducer;