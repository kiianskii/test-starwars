import { MarkerType } from "react-flow-renderer";

export const nodesMade = ({ hero, filteredFilms, starships }) => {
  console.log(starships);
  const filmsNodes = filteredFilms.map((film, index) => {
    return {
      id: (film.id + 1).toString(),
      type: "input",
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
    };
  });

  const starshipsNodes = starships.map((ship, index) => {
    return {
      id: (ship.id + 1).toString(),
      type: "input",
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
    };
  });

  const nodes = [
    {
      id: "1",
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
  ];

  nodes.push(...filmsNodes);

  nodes.push(...starshipsNodes);

  return nodes;
};

export const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "animated edge",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "edge with arrow head",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    label: "smooth step edge",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    label: "a step edge",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];

// {
//       id: "2",
//       data: {
//         label: (
//           <>
//             This one has a <strong>custom style</strong>
//           </>
//         ),
//       },
//       position: { x: 100, y: 100 },
//       style: {
//         background: "#D6D5E6",
//         color: "#333",
//         border: "1px solid #222138",
//         width: 180,
//       },
//     },
//     {
//       id: "3",
//       data: {
//         label: (
//           <>
//             This one has a <strong>custom style</strong>
//           </>
//         ),
//       },
//       position: { x: 400, y: 100 },
//       style: {
//         background: "#D6D5E6",
//         color: "#333",
//         border: "1px solid #222138",
//         width: 180,
//       },
//     },
//     {
//       id: "4",
//       position: { x: 250, y: 200 },
//       data: {
//         label: "Another default node",
//       },
//     },
//     {
//       id: "5",
//       data: {
//         label: "Node id: 5",
//       },
//       position: { x: 250, y: 325 },
//     },
//     {
//       id: "6",
//       type: "output",
//       data: {
//         label: (
//           <>
//             An <strong>output node</strong>
//           </>
//         ),
//       },
//       position: { x: 100, y: 480 },
//     },
//     {
//       id: "7",
//       type: "output",
//       data: { label: "Another output node" },
//       position: { x: 400, y: 450 },
//     },
