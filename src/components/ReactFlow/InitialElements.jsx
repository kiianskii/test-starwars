// import { MarkerType } from "@xyflow/react";

// export const nodesMade = ({ hero, filteredFilms, starships }) => {
//   if (!hero) return { nodes: [], edges: [] };

//   const filmsNodes = filteredFilms.map((film, index) => ({
//     id: film.id.toString(),
//     data: {
//       label: (
//         <>
//           <h4 className="pop">{film.title}</h4>
//         </>
//       ),
//     },
//     position: { x: 190 * index, y: 130 },
//     style: {
//       background: "#e8e7f5",
//       color: "#333",
//       border: "1px solid #222138",
//       width: 170,
//     },
//   }));

//   const starshipsNodes = starships.map((ship, index) => ({
//     id: ship.id.toString(),
//     data: {
//       label: (
//         <>
//           <h4 className="pop">{ship.name}</h4>
//         </>
//       ),
//     },
//     position: { x: 190 * index, y: 330 },
//     style: {
//       background: "#D6D5E6",
//       color: "#333",
//       border: "1px solid #222138",
//       width: 170,
//     },
//   }));

//   const nodes = [
//     {
//       id: "1000",
//       type: "input",
//       data: {
//         label: (
//           <>
//             <h3>{hero?.name}</h3>
//           </>
//         ),
//       },
//       position: { x: 200, y: 1 },
//     },
//     ...filmsNodes,
//     ...starshipsNodes,
//   ];

//   const filmsEdges = filteredFilms.map((film) => ({
//     id: `e1000-${film.id}`,
//     source: "1000",
//     target: film.id.toString(),
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   }));

//   const starshipsEdges = filteredFilms.flatMap((film) => {
//     return starships
//       .filter((ship) => film.starships.includes(ship.id))
//       .map((ship) => ({
//         id: `e${film.id}-${ship.id}`,
//         source: film.id.toString(),
//         target: ship.id.toString(),

//         markerEnd: {
//           type: MarkerType.ArrowClosed,
//         },
//       }));
//   });

//   const edges = [...filmsEdges, ...starshipsEdges];

//   return { nodes, edges };
// };

import { MarkerType } from "@xyflow/react";

export const nodesMade = ({ hero, filteredFilms, starships }) => {
  if (!hero) return { nodes: [], edges: [] };

  // Додаємо вузли для фільмів і зорельотів
  const filmsHeaderNode = {
    id: "films-header",
    data: {
      label: (
        <>
          <h4>Films:</h4>
        </>
      ),
    },
    position: { x: 0, y: 130 }, // Розташування заголовка для фільмів
    style: {
      background: "#fff",
      color: "#333",
      border: "none",
      width: 170,
    },
  };

  const starshipsHeaderNode = {
    id: "starships-header",
    data: {
      label: (
        <>
          <h4>Spaceships:</h4>
        </>
      ),
    },
    position: { x: 0, y: 330 }, // Розташування заголовка для зорельотів
    style: {
      background: "#fff",
      color: "#333",
      border: "none",
      width: 170,
    },
  };

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

  const starshipsNodes = starships.map((ship, index) => ({
    id: ship.id.toString(),
    data: {
      label: (
        <>
          <h4 className="pop">{ship.name}</h4>
        </>
      ),
    },
    position: { x: 190 + 190 * index, y: 330 }, // Відступ від заголовка
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
    filmsHeaderNode,
    ...filmsNodes,
    starshipsHeaderNode,
    ...starshipsNodes,
  ];

  const filmsEdges = filteredFilms.map((film) => ({
    id: `e1000-${film.id}`,
    source: "1000",
    target: film.id.toString(),
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }));

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

  const edges = [...filmsEdges, ...starshipsEdges];

  return { nodes, edges };
};
