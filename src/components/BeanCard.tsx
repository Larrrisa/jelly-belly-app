import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBeansById } from "../store/BeansApiSlice";
import style from "../styles/Card.module.css";

import { useParams } from "react-router-dom";

function BeanCard() {
  const dispatch = useAppDispatch();
  const bean = useAppSelector((state) => state.beans.bean);
  const loading = useAppSelector((state) => state.beans.loading);
  const { beanId } = useParams<{ beanId: any }>();

  console.log(beanId);
  useEffect(() => {
    dispatch(fetchBeansById(beanId));
  }, [dispatch]);

  return (
    <div className={style.card}>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      <h1>{bean?.flavorName}</h1>
      <div className={style.image}>
        {bean?.imageUrl && <img src={bean.imageUrl} alt={bean.flavorName} />}
      </div>
      <p>{bean?.description}</p>
    </div>
  );
}

export default BeanCard;
