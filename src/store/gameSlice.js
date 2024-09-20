// src/store/gameSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../utils/axiosInstance"

// Async actions for game operations
export const startGame = createAsyncThunk("game/startGame", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/games/start")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.msg || "Failed to start game")
  }
})

export const playMove = createAsyncThunk("game/playMove", async (gameId, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/games/move", { gameId })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.msg || "Failed to play move")
  }
})

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameId: null,
    gameState: null,
    loading: false,
    error: null,
    message: null,
    gameOver: false,
    didWin: null,
    lastDrawnCard: null,
  },
  reducers: {
    resetGame: (state) => {
      state.gameId = null
      state.gameState = null
      state.message = null
      state.gameOver = false
      state.didWin = null
      state.lastDrawnCard = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle startGame
      .addCase(startGame.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.loading = false
        state.gameId = action.payload.gameId
        state.gameState = action.payload.gameState
        state.message = action.payload.msg
      })
      .addCase(startGame.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
      // Handle playMove
      .addCase(playMove.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(playMove.fulfilled, (state, action) => {
        state.loading = false
        state.gameState = action.payload.gameState
        state.message = action.payload.msg
        state.gameOver = action.payload.gameOver
        state.didWin = action.payload.didWin
        state.lastDrawnCard = action.payload.drawnCard
      })
      .addCase(playMove.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetGame } = gameSlice.actions
export default gameSlice.reducer
