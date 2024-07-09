import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFacts, fetchMoreFacts } from "../store/FactsApiSlice";
import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import useInfiniteScroll from "../utils";

function FactsList() {
  const dispatch = useAppDispatch();
  const facts = useAppSelector((state) => state.facts);
  const loading = useAppSelector((state) => state.facts.loading);

  useEffect(() => {
    dispatch(fetchFacts());
  }, [dispatch]);

  useInfiniteScroll(facts.currentPage, facts.totalPages, (nextPage) => {
    dispatch(fetchMoreFacts(nextPage));
  });

  return (
    <div className={style.container}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {facts.items.map((item) => (
        <div key={item.factId} className={style.item}>
          <p>{item.factId}.</p>
          <Link to={`${item.factId}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default FactsList;
