export interface BeanItem {
  beanId: number;
  flavorName: string;
  imageUrl: string;
  description: string;
}

export interface BeansData {
  items: BeanItem[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  bean: BeanItem | null;
}

export interface CombinationItem {
  combinationId: number;
  name: string;
}

export interface CombinationsData {
  items: CombinationItem[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  combination: CombinationItem | null;
}

export interface FactsItem {
  factId: number;
  title: string;
  description: string;
}

export interface FactsData {
  items: FactsItem[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  facts: FactsItem | null;
}

export interface HistoryItem {
  mileStoneId: number;
  year: number;
  description: string;
}

export interface HistoryData {
  items: HistoryItem[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  history: HistoryItem | null;
}

export interface RecipeItem {
  recipeId: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface RecipesData {
  items: RecipeItem[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  recipe: RecipeItem | null;
}
