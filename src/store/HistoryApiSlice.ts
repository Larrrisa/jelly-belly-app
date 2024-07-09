import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HistoryData, HistoryItem } from "../types/types";

const initialState: HistoryData = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  loading: "idle",
  error: null,
  history: null,
};

export const fetchHistory = createAsyncThunk("/fetchHistory", async () => {
  const response = await axios.get(
    "https://jellybellywikiapi.onrender.com/api/mileStones"
  );
  return response.data;
});

export const fetchMoreHistory = createAsyncThunk(
  "/fetchMoreHistory",
  async (page: number) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/mileStones?pageIndex=${page}`
    );
    return response.data;
  }
);

export const fetchHistoryById = createAsyncThunk(
  "history/fetchHistoryById",
  async (id: string) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/mileStones/${id}`
    );
    return response.data;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchHistory.fulfilled,
        (state, action: PayloadAction<HistoryData>) => {
          state.loading = "succeeded";
          state.items = action.payload.items;
          state.totalCount = action.payload.totalCount;
          state.pageSize = action.payload.pageSize;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(
        fetchMoreHistory.fulfilled,
        (state, action: PayloadAction<HistoryData>) => {
          state.loading = "succeeded";
          state.items = [...state.items, ...action.payload.items];
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMoreHistory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(fetchHistoryById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchHistoryById.fulfilled,
        (state, action: PayloadAction<HistoryItem>) => {
          state.loading = "succeeded";
          state.history = action.payload;
        }
      )
      .addCase(fetchHistoryById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default historySlice.reducer;
