import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/Api.js";
import { successToast, errorToast } from "../utils/toast.js";

// ----------------- Thunks -----------------

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/register", userData);
     

       localStorage.setItem("accessToken", data.data.accessToken);
       localStorage.setItem("refreshToken", data.data.refreshToken);
       
       return data.data.user; 
       console.log(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/login", credentials);
       localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      return data.data.user;
      console.log(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/users/logout");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/me");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ----------------- Slice -----------------

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser: (state, action) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        successToast("Registration successful!");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        errorToast(action.payload);
      })

      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        successToast("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        errorToast(action.payload);
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; successToast("Logout successful!"); })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => { state.loading = true; })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
