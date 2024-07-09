import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RecipeItem, RecipesData } from "../types/types";

const initialState: RecipesData = {
  items: [],
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  loading: "idle",
  error: null,
  recipe: null,
};

export const fetchRecipes = createAsyncThunk("/fetchRecipes", async () => {
  const response = await axios.get(
    "https://jellybellywikiapi.onrender.com/api/recipes"
  );
  return response.data;
});

export const fetchMoreRecipes = createAsyncThunk(
  "/fetchMoreRecipes",
  async (page: number) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/recipes?pageIndex=${page}`
    );
    return response.data;
  }
);

export const fetchRecipesById = createAsyncThunk(
  "recipes/fetchRecipesById",
  async (id: string) => {
    const response = await axios.get(
      `https://jellybellywikiapi.onrender.com/api/recipes/${id}`
    );
    return response.data;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<RecipesData>) => {
          state.loading = "succeeded";
          state.items = action.payload.items;
          state.totalCount = action.payload.totalCount;
          state.pageSize = action.payload.pageSize;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(
        fetchMoreRecipes.fulfilled,
        (state, action: PayloadAction<RecipesData>) => {
          state.loading = "succeeded";
          state.items = [...state.items, ...action.payload.items];
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMoreRecipes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch ";
      })
      .addCase(fetchRecipesById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchRecipesById.fulfilled,
        (state, action: PayloadAction<RecipeItem>) => {
          state.loading = "succeeded";
          state.recipe = action.payload;
        }
      )
      .addCase(fetchRecipesById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch ";
      });
  },
});

export default recipesSlice.reducer;
