import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes, fetchMoreRecipes } from "../store/RecipesApiSlice";
import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import useInfiniteScroll from "../utils";

function RecipesList() {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes);
  const loading = useAppSelector((state) => state.recipes.loading);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useInfiniteScroll(recipes.currentPage, recipes.totalPages, (nextPage) => {
    dispatch(fetchMoreRecipes(nextPage));
  });

  return (
    <div className={style.container}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {recipes.items.map((item) => (
        <div key={item.recipeId} className={style.item}>
          <p>{item.recipeId}.</p>
          <Link to={`${item.recipeId}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default RecipesList;
