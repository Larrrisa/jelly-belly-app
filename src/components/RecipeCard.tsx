import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipesById } from "../store/RecipesApiSlice";
import style from "../styles/Card.module.css";
import { useParams } from "react-router-dom";

function RecipeCard() {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state) => state.recipes.recipe);
  const loading = useAppSelector((state) => state.recipes.loading);
  const { recipeId } = useParams<{ recipeId: any }>();

  useEffect(() => {
    dispatch(fetchRecipesById(recipeId));
  }, [dispatch]);

  return (
    <div className={style.card}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      <h1>{recipe?.name}</h1>
      <div className={style.image}>
        {recipe?.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
      </div>

      <p>{recipe?.description}</p>
    </div>
  );
}

export default RecipeCard;
