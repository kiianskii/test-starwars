import { Suspense, useEffect } from "react";
// import "./App.css";
import { useDispatch } from "react-redux";
import { fetchFilmsThunk, fetchHeroesThunk } from "./redux/operations";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ReactFlowComponent from "./components/ReactFlow/ReactFlowComponent";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroesThunk());
    dispatch(fetchFilmsThunk());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:id" element={<ReactFlowComponent />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
