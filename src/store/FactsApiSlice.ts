import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FactsItem, FactsData } from "../types/types";

const initialState: FactsData = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  loading: "idle",
  error: null,
  facts: null,
};

export const fetchFacts = createAsyncThunk("/fetchFacts", async () => {
  const response = await axios.get(
    "https://jellybellywikiapi.onrender.com/api/facts"
  );
  return response.data;
});

export const fetchMoreFacts = createAsyncThunk(
  "/fetchMoreFacts",
  async (page: number) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/facts?pageIndex=${page}`
    );
    return response.data;
  }
);

export const fetchFactsById = createAsyncThunk(
  "facts/fetchFactsById",
  async (id: string) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/facts/${id}`
    );
    return response.data;
  }
);

const factsSlice = createSlice({
  name: "facts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchFacts.fulfilled,
        (state, action: PayloadAction<FactsData>) => {
          state.loading = "succeeded";
          state.items = action.payload.items;
          state.totalCount = action.payload.totalCount;
          state.pageSize = action.payload.pageSize;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchFacts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch facts";
      })
      .addCase(
        fetchMoreFacts.fulfilled,
        (state, action: PayloadAction<FactsData>) => {
          state.loading = "succeeded";
          state.items = [...state.items, ...action.payload.items];
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMoreFacts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch facts";
      })
      .addCase(fetchFactsById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchFactsById.fulfilled,
        (state, action: PayloadAction<FactsItem>) => {
          state.loading = "succeeded";
          state.facts = action.payload;
        }
      )
      .addCase(fetchFactsById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch facts";
      });
  },
});

export default factsSlice.reducer;
