import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BeanItem, BeansData } from "../types/types";

const initialState: BeansData = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  loading: "idle",
  error: null,
  bean: null,
};

export const fetchBeans = createAsyncThunk("/fetchBeans", async () => {
  const response = await axios.get(
    "https://jellybellywikiapi.onrender.com/api/beans"
  );
  return response.data;
});

export const fetchMoreBeans = createAsyncThunk(
  "/fetchMoreBeans",
  async (page: number) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/beans?pageIndex=${page}`
    );
    return response.data;
  }
);

export const fetchBeansById = createAsyncThunk(
  "beans/fetchBeansById",
  async (id: string) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/beans/${id}`
    );
    return response.data;
  }
);

const beansSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeans.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchBeans.fulfilled,
        (state, action: PayloadAction<BeansData>) => {
          state.loading = "succeeded";
          state.items = action.payload.items;
          state.totalCount = action.payload.totalCount;
          state.pageSize = action.payload.pageSize;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchBeans.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch beans";
      })
      .addCase(
        fetchMoreBeans.fulfilled,
        (state, action: PayloadAction<BeansData>) => {
          state.loading = "succeeded";
          state.items = [...state.items, ...action.payload.items];
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMoreBeans.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch beans";
      })
      .addCase(fetchBeansById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchBeansById.fulfilled,
        (state, action: PayloadAction<BeanItem>) => {
          state.loading = "succeeded";
          state.bean = action.payload;
        }
      )
      .addCase(fetchBeansById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch beans";
      });
  },
});

export default beansSlice.reducer;
