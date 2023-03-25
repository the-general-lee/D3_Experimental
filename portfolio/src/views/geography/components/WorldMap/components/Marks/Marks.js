import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  scaleSqrt,
  max,
  geoCircle,
} from "d3";
import { useEffect, useMemo, useState } from "react";
import { memoize } from "lodash";
import "./Marks.css";

const projection = geoOrthographic().rotate([0, 0, 0]);
const path = geoPath(projection).pointRadius((datum) => datum.radius);
const circularPath = geoCircle();

const graticule = geoGraticule();
const MemoedPathFunc = memoize(
  (tuple) => path(tuple.feature),
  (tuple) => tuple.counter
);
const sizeValue = (d) => d["Total Dead and Missing"];
const maxRadius = 5;
const Marks = ({
  worldMapData: { land, interiors },
  Missing,
  filteredMissing,
}) => {
  const [counter, setCounter] = useState(0);

  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(Missing, sizeValue)])
        .range([0, maxRadius]),
    [Missing, maxRadius]
  );

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
      {useMemo(
        () => (
          <>
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticules" d={path(graticule())} />

            <path className="land" d={pathGenerated} />

            <path className="interiors" d={path(interiors)} />
          </>
        ),
        [path, graticule, pathGenerated, interiors]
      )}
      {filteredMissing
        ? filteredMissing.map((datum) => {
            return (
              <path
                className="circle"
                d={path(
                  circularPath
                    .center([datum.coords[0], datum.coords[1]])
                    .radius(sizeScale(sizeValue(datum)))(datum)
                )}
              />
            );
          })
        : null}
    </g>
  );
};

export default Marks;
