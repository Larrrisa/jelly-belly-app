import style from "../styles/MainPage.module.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className={style.container}>
      <Link to="/beans">Beans</Link>
      <Link to="/facts">Facts</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/combinations">Combinations</Link>
      <Link to="/history">History</Link>
    </div>
  );
}

export default MainPage;
