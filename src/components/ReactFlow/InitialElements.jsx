import { MarkerType } from "@xyflow/react";

export const nodesMade = ({ hero, filteredFilms, starships }) => {
  if (!hero) return { nodes: [], edges: [] };

  //Informational node about Films
  const filmsHeaderNode = {
    id: "films-header",
    data: {
      label: (
        <>
          <h4>Films:</h4>
        </>
      ),
    },
    position: { x: 0, y: 130 },
    style: {
      background: "#fff",
      color: "#333",
      border: "none",
      width: 170,
    },
  };

  //Informational node about Starships

  const starshipsHeaderNode =
    starships.length > 0
      ? {
          id: "starships-header",
          data: {
            label: (
              <>
                <h4>Starships:</h4>
              </>
            ),
          },
          position: { x: 0, y: 280 },
          style: {
            background: "#fff",
            color: "#333",
            border: "none",
            width: 170,
          },
        }
      : null;

  //Mapping films where appears choosed hero and returning nodes
  const filmsNodes = filteredFilms.map((film, index) => ({
    id: film.id.toString(),
    data: {
      label: (
        <>
          <h4 className="pop">{film.title}</h4>
        </>
      ),
    },
    position: { x: 190 + 190 * index, y: 130 }, // Відступ від заголовка
    style: {
      background: "#e8e7f5",
      color: "#333",
      border: "1px solid #222138",
      width: 170,
    },
  }));

  //Mapping starhips which used hero and returning nodes

  const starshipsNodes = starships.map((ship, index) => ({
    id: ship.id.toString(),
    data: {
      label: (
        <>
          <h4 className="pop">{ship.name}</h4>
        </>
      ),
    },
    position: { x: 190 + 190 * index, y: 280 }, // Відступ від заголовка
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 170,
    },
  }));

  //Connecting all nodes
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
    filmsHeaderNode,
    ...filmsNodes,
    starshipsHeaderNode,
    ...starshipsNodes,
  ].filter(Boolean);

  //Mapping and returning edges for films
  const filmsEdges = filteredFilms.map((film) => ({
    id: `e1000-${film.id}`,
    source: "1000",
    target: film.id.toString(),
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));

  //Mapping and returning edges for starships

  const starshipsEdges = filteredFilms.flatMap((film) => {
    return starships
      .filter((ship) => film.starships.includes(ship.id))
      .map((ship) => ({
        id: `e${film.id}-${ship.id}`,
        source: film.id.toString(),
        target: ship.id.toString(),
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }));
  });
  //Connecting all edges

  const edges = [...filmsEdges, ...starshipsEdges];

  return { nodes, edges };
};
