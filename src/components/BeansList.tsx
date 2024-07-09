import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBeans, fetchMoreBeans } from "../store/BeansApiSlice";
import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import useInfiniteScroll from "../utils";

function BeansList() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.beans.loading);
  const beans = useAppSelector((state) => state.beans);

  useEffect(() => {
    dispatch(fetchBeans());
  }, [dispatch]);

  useInfiniteScroll(beans.currentPage, beans.totalPages, (nextPage) => {
    dispatch(fetchMoreBeans(nextPage));
  });

  return (
    <div className={style.container}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {beans.items.map((item) => (
        <div key={item.beanId} className={style.item}>
          <p> {item.beanId}.</p>
          <Link to={`${item.beanId}`}>{item.flavorName}</Link>
        </div>
      ))}
    </div>
  );
}

export default BeansList;
