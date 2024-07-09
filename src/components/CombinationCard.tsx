import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCombinationsById } from "../store/CombinationsApiSlice";
import { useParams } from "react-router-dom";
import style from "../styles/Card.module.css";

function BeanCard() {
  const dispatch = useAppDispatch();
  const combination = useAppSelector((state) => state.combinations.combination);
  const loading = useAppSelector((state) => state.combinations.loading);
  const { combinationId } = useParams<{ combinationId: any }>();

  useEffect(() => {
    dispatch(fetchCombinationsById(combinationId));
  }, [dispatch]);
  console.log(combination);

  return (
    <div className={style.card}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      <h1>{combination?.name}</h1>
    </div>
  );
}

export default BeanCard;
