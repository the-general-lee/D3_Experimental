import React, { useRef, useState } from "react";
import WorldMap from "./components/WorldMap";
import BarChart from "./components/BarChart";
import { useData } from "./helpers/useData";
const width = 960;
const height = 500;

const Geography = () => {
  const svg = useRef();
  const [brushExtent, setBrushExtent] = useState();
  const data = useData();
  const xValue = (d) => d["Reported Date"];

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data?.slice(0, 100);
  if (!data) return;

  return (
    <svg
      ref={svg}
      width={width}
      height={height}
      transform={"translate(200,50)"}
    >
      <WorldMap data={data} filteredData={filteredData} />
      <g transform={`translate(0, ${height - 0.2 * height})`}>
        <BarChart
          width={width}
          height={0.2 * height}
          data={data}
          setBrushExtent={setBrushExtent}
        />
      </g>
    </svg>
  );
};
export default Geography;
