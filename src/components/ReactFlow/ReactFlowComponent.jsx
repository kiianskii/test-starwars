import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { edges as initialEdges, nodesMade } from "./InitialElements";
import { useSelector } from "react-redux";
import { selectHeroes, selectIsLoading } from "../../redux/slice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ReactFlowComponent = () => {
  const characters = useSelector(selectHeroes);
  const isLoading = useSelector(selectIsLoading);
  const { id } = useParams();

  const [initialNodes, setInitialNodes] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (characters.length > 0 && id) {
      const hero = characters.find((hero) => hero.id == id);
      if (hero) {
        const nodes = nodesMade(hero);
        setInitialNodes(nodes);
      }
    }
  }, [characters, id]);

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
