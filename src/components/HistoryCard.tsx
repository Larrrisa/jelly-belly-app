import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchHistoryById } from "../store/HistoryApiSlice";
import { useParams } from "react-router-dom";
import style from "../styles/Card.module.css";

function HistoryCard() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.history);
  const loading = useAppSelector((state) => state.history.loading);
  const { mileStoneId } = useParams<{ mileStoneId: any }>();

  useEffect(() => {
    dispatch(fetchHistoryById(mileStoneId));
  }, [dispatch]);

  return (
    <div className={style.card}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      <h1>{history?.year}</h1>
      <p>{history?.description}</p>
    </div>
  );
}

export default HistoryCard;
