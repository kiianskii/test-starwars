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
    position: { x: 190 * index, y: 130 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 170,
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
    position: { x: 190 * index, y: 330 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 170,
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
      position: { x: 200, y: 1 },
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

  return { nodes, edges };
};
