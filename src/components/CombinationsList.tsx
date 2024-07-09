import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCombinations,
  fetchMoreCombinations,
} from "../store/CombinationsApiSlice";
import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import useInfiniteScroll from "../utils";

function CombinationsList() {
  const dispatch = useAppDispatch();
  const combinations = useAppSelector((state) => state.combinations);
  const loading = useAppSelector((state) => state.combinations.loading);

  useEffect(() => {
    dispatch(fetchCombinations());
  }, [dispatch]);

  useInfiniteScroll(
    combinations.currentPage,
    combinations.totalPages,
    (nextPage) => {
      dispatch(fetchMoreCombinations(nextPage));
    }
  );

  return (
    <div className={style.container}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {combinations.items.map((item) => (
        <div key={item.combinationId} className={style.item}>
          <p>{item.combinationId}.</p>
          <Link to={`${item.combinationId}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default CombinationsList;
