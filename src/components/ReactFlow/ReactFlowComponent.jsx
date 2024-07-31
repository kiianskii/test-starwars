import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { edges as initialEdges, nodesMade } from "./InitialElements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilms,
  selectHeroes,
  selectIsLoading,
  selectStarships,
} from "../../redux/slice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStarships } from "../../redux/operations";

const ReactFlowComponent = () => {
  const dispatch = useDispatch();
  const starships = useSelector(selectStarships);
  const characters = useSelector(selectHeroes);
  const isLoading = useSelector(selectIsLoading);
  const films = useSelector(selectFilms);
  const { id } = useParams();

  const [initialNodes, setInitialNodes] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (characters.length > 0 && id) {
      const hero = characters.find((hero) => hero.id == id);
      const filteredFilms = films.filter((film) =>
        film.characters.includes(hero.id)
      );
      if (hero && filteredFilms) {
        const starshipIds = hero.starships;
        // Запуск запиту для отримання даних про starships
        dispatch(fetchStarships(starshipIds));
      }
    }
  }, [characters, id, films, dispatch]);

  useEffect(() => {
    if (characters.length > 0 && id && starships.length > 0) {
      const hero = characters.find((hero) => hero.id == id);
      const filteredFilms = films.filter((film) =>
        film.characters.includes(hero.id)
      );
      if (hero && filteredFilms) {
        // Передаємо hero, filteredFilms і starships у nodesMade
        const nodes = nodesMade({ hero, filteredFilms, starships });
        setInitialNodes(nodes);
      }
    }
  }, [characters, id, films, starships]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default ReactFlowComponent;
