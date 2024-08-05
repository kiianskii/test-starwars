import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { nodesMade } from "./InitialElements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilms,
  selectHeroes,
  selectIsLoading,
  selectStarships,
} from "../../redux/slice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStarships } from "../../redux/operations";
import Loader from "../Loader/Loader";

const ReactFlowComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const starships = useSelector(selectStarships);
  const characters = useSelector(selectHeroes);
  const isLoading = useSelector(selectIsLoading);
  const films = useSelector(selectFilms);
  const { id } = useParams();

  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (characters.length > 0 && Number(id)) {
      const hero = characters.find((hero) => hero.id === Number(id));
      if (!hero) {
        navigate("/");
        return;
      }
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
    if (characters.length > 0 && Number(id) && starships.length > 0) {
      const hero = characters.find((hero) => hero.id === Number(id));
      const filteredFilms = films.filter((film) =>
        film.characters.includes(hero.id)
      );
      if (hero && filteredFilms) {
        const starshipIds = hero.starships;
        if (!starshipIds.length > 0) {
          const { nodes, edges } = nodesMade({
            hero,
            filteredFilms,
            starships: [],
          });
          setInitialNodes(nodes);
          setInitialEdges(edges);
        } else {
          const { nodes, edges } = nodesMade({
            hero,
            filteredFilms,
            starships,
          });
          setInitialNodes(nodes);
          setInitialEdges(edges);
        }
      }
    }
  }, [characters, id, films, starships]);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialEdges, initialNodes, setEdges, setNodes]);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  return isLoading ? (
    <Loader />
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
