import { geoNaturalEarth1, geoOrthographic, geoPath, geoGraticule } from "d3";
import { memo, useEffect, useState } from "react";
import { memoize } from "lodash";
import "./Marks.css";

const projection = geoOrthographic().rotate([0, 0, 0]);
const path = geoPath(projection);
const graticule = geoGraticule();
const MemoedPathFunc = memoize(
  (tuple) => path(tuple.feature),
  (tuple) => tuple.counter
);
const Marks = ({ data: { land, interiors }, svg: svgRef }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCounter((counter) => (counter + 1) % 360),
      100
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  projection.rotate([1 * counter, 0]);
  const tuple = { feature: land.features[0], counter };

  const pathGenerated = MemoedPathFunc(tuple);

  return (
    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />

      <path className="land" d={pathGenerated} />

      <path className="interiors" d={path(interiors)} />
    </g>
  );
};

export default Marks;
