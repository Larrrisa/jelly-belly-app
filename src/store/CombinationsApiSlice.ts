import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CombinationItem, CombinationsData } from "../types/types";

const initialState: CombinationsData = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  loading: "idle",
  error: null,
  combination: null,
};

export const fetchCombinations = createAsyncThunk(
  "/fetchCombinations",
  async () => {
    const response = await axios.get(
      "https://jellybellywikiapi.onrender.com/api/combinations"
    );
    return response.data;
  }
);

export const fetchMoreCombinations = createAsyncThunk(
  "/fetchMoreCombinations",
  async (page: number) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/combinations?pageIndex=${page}`
    );
    return response.data;
  }
);

export const fetchCombinationsById = createAsyncThunk(
  "recipes/fetchCombinationsById",
  async (id: string) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/combinations/${id}`
    );
    return response.data;
  }
);

const combinationsSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCombinations.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchCombinations.fulfilled,
        (state, action: PayloadAction<CombinationsData>) => {
          state.loading = "succeeded";
          state.items = action.payload.items;
          state.totalCount = action.payload.totalCount;
          state.pageSize = action.payload.pageSize;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchCombinations.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(
        fetchMoreCombinations.fulfilled,
        (state, action: PayloadAction<CombinationsData>) => {
          state.loading = "succeeded";
          state.items = [...state.items, ...action.payload.items];
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMoreCombinations.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(fetchCombinationsById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchCombinationsById.fulfilled,
        (state, action: PayloadAction<CombinationItem>) => {
          state.loading = "succeeded";
          state.combination = action.payload;
        }
      )
      .addCase(fetchCombinationsById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default combinationsSlice.reducer;
