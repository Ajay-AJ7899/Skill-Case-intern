import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register, getCurrentUser } from '../api/authApi';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isLoading: false,
  isInitialized: false,
  error: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await register(payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Unable to register right now'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await login(payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Unable to log in right now'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Unable to fetch current user'
      );
    }
  }
);

const persistToken = (token) => {
  localStorage.setItem('token', token);
};

const clearStoredToken = () => {
  localStorage.removeItem('token');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    finishInitialization: (state) => {
      state.isInitialized = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = '';
      state.isInitialized = true;
      clearStoredToken();
    },
    clearAuthError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistToken(action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistToken(action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.token = null;
        state.user = null;
        state.error = action.payload;
        clearStoredToken();
      });
  },
});

export const { setToken, finishInitialization, logout, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;
