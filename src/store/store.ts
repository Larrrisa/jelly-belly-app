import { configureStore } from "@reduxjs/toolkit";
import beansReducer from "./BeansApiSlice";
import factsReducer from "./FactsApiSlice";
import recipeReducer from "./RecipesApiSlice";
import combinationsReducer from "./CombinationsApiSlice";
import historyReducer from "./HistoryApiSlice";

export const store = configureStore({
  reducer: {
    beans: beansReducer,
    facts: factsReducer,
    recipes: recipeReducer,
    combinations: combinationsReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
