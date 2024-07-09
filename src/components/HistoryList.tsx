import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchHistory, fetchMoreHistory } from "../store/HistoryApiSlice";
import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import useInfiniteScroll from "../utils";

function HistoryList() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history);
  const loading = useAppSelector((state) => state.history.loading);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useInfiniteScroll(history.currentPage, history.totalPages, (nextPage) => {
    dispatch(fetchMoreHistory(nextPage));
  });

  return (
    <div className={style.container}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {history.items.map((item) => (
        <div key={item.mileStoneId} className={style.item}>
          <p>{item.mileStoneId}.</p>
          <Link to={`${item.mileStoneId}`}>{item.year}</Link>
        </div>
      ))}
    </div>
  );
}

export default HistoryList;
