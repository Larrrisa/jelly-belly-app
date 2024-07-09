import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFactsById } from "../store/FactsApiSlice";
import { useParams } from "react-router-dom";
import style from "../styles/Card.module.css";

function FactCard() {
  const dispatch = useAppDispatch();
  const fact = useAppSelector((state) => state.facts.facts);
  const loading = useAppSelector((state) => state.facts.loading);
  const { factId } = useParams<{ factId: any }>();

  useEffect(() => {
    dispatch(fetchFactsById(factId));
  }, [dispatch]);

  return (
    <div className={style.card}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      <h1>{fact?.title}</h1>
      <p>{fact?.description}</p>
    </div>
  );
}

export default FactCard;
