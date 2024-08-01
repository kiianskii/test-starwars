export const nodesMade = ({ hero, filteredFilms, starships }) => {
  if (!hero) return { nodes: [], edges: [] };

  const filmsNodes = filteredFilms.map((film, index) => ({
    id: film.id.toString(),

    data: {
      label: (
        <>
          <h4 className="pop">{film.title}</h4>
        </>
      ),
    },
    position: { x: 230, y: 50 * index },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 160,
    },
  }));

  const starshipsNodes = starships.map((ship, index) => ({
    id: ship.id.toString(),

    data: {
      label: (
        <>
          <h4 className="pop">{ship.name}</h4>
        </>
      ),
    },
    position: { x: 430, y: 50 * index },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 160,
    },
  }));

  const nodes = [
    {
      id: "1000",
      type: "input",
      data: {
        label: (
          <>
            <h3>{hero?.name}</h3>
          </>
        ),
      },
      position: { x: 30, y: 0 },
    },
    ...filmsNodes,
    ...starshipsNodes,
  ];

  const filmsEdges = filteredFilms.map((film) => ({
    id: `e1000-${film.id}`,
    source: "1000",
    target: film.id.toString(),
  }));

  const starshipsEdges = filteredFilms.flatMap((film) => {
    return starships
      .filter((ship) => film.starships.includes(ship.id))
      .map((ship) => ({
        id: `e${film.id}-${ship.id}`,
        source: film.id.toString(),
        target: ship.id.toString(),
      }));
  });

  const edges = [...filmsEdges, ...starshipsEdges];

  // Перевірка наявності всіх target у nodes
  const nodeIds = new Set(nodes.map((node) => node.id));
  edges.forEach((edge) => {
    if (!nodeIds.has(edge.source)) {
      console.error(`Edge source node ID not found: ${edge.source}`);
    }
    if (!nodeIds.has(edge.target)) {
      console.error(`Edge target node ID not found: ${edge.target}`);
    }
  });

  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  return { nodes, edges };
};
