import { Suspense, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchHeroesThunk } from "./redux/operations";
import HeroesList from "./components/HeroesList/HeroesList";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroesThunk());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HeroesList />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
