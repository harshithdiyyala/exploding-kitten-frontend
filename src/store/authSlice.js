// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../utils/axiosInstance"

// Async actions for login and registration
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/auth/login", credentials)
    return response.data.user
  } catch (error) {
    return rejectWithValue(error.response.data.msg || "Login failed")
  }
})

export const register = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/auth/register", credentials)
    return response.data.user
  } catch (error) {
    return rejectWithValue(error.response.data.msg || "Registration failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
      // Handle registration
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
