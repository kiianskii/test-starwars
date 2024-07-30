import { Suspense, useEffect } from "react";
// import "./App.css";
import { useDispatch } from "react-redux";
import { fetchHeroesThunk } from "./redux/operations";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroesThunk());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
