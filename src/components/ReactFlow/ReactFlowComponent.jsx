import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchStarships } from "../../redux/operations";
import {
  selectFilms,
  selectHeroes,
  selectIsLoading,
  selectStarships,
} from "../../redux/slice";

import Loader from "../Loader/Loader";
import { nodesMade } from "./InitialElements";

const ReactFlowComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const starships = useSelector(selectStarships);
  const characters = useSelector(selectHeroes);
  const isLoading = useSelector(selectIsLoading);
  const films = useSelector(selectFilms);
  const { id } = useParams();

  // States for controlling nodes and edges that React Flow need
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //useEffect that controlles fetching Starships

  useEffect(() => {
    if (characters.length > 0 && id) {
      const hero = characters.find((hero) => hero.id === Number(id));
      if (hero) {
        const filteredFilms = films.filter((film) =>
          film.characters.includes(hero.id)
        );
        if (filteredFilms.length > 0) {
          const starshipIds = hero.starships;
          if (starshipIds.length > 0) {
            dispatch(fetchStarships(starshipIds));
          }
        }
      } else {
        navigate("/");
      }
    }
  }, [characters, id, films, dispatch, navigate]);

  //useEffect that controlles making nodes and edges for React Flow

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

  //useEffect that set nodes and edges before render React Flow component
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
