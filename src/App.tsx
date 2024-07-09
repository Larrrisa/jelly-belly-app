import BeansList from "./components/BeansList";
import BeanCard from "./components/BeanCard";
import MainPage from "./components/MainPage";
import FactsList from "./components/FactsList";
import FactCard from "./components/FactCard";
import RecipesList from "./components/RecipesList";
import RecipeCard from "./components/RecipeCard";
import CombinationsList from "./components/CombinationsList";
import CombinationCard from "./components/CombinationCard";
import HistoryList from "./components/HistoryList";
import HistoryCard from "./components/HistoryCard";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/beans" element={<BeansList />} />
          <Route path="/beans/:beanId" element={<BeanCard />} />
          <Route path="/combinations" element={<CombinationsList />} />
          <Route
            path="/combinations/:combinationId"
            element={<CombinationCard />}
          />
          <Route path="/facts" element={<FactsList />} />
          <Route path="/facts/:factId" element={<FactCard />} />
          <Route path="/history" element={<HistoryList />} />
          <Route path="/history/:mileStoneId" element={<HistoryCard />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="/recipes/:recipeId" element={<RecipeCard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
