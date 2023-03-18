import React, { useState } from "react";
import { scaleLinear, extent, scaleTime } from "d3";

import { useData } from "./helpers/useData";
import { Marks } from "./components/Marks";
import { Channels } from "./components/Channels";
import BarPlot from "../pie";
const margin = { top: 140, bottom: 100, right: 45, left: 220 };

const Line = () => {
  const [data, monthlyData] = useData();
  const [showTooltip, setShowTooltip] = useState(false);

  if (data === null || monthlyData === null) {
    return;
  }
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const xAccessor = (datum) => datum.Date;
  const yAccessor = (datum) => datum["Avg Temp."];

  const xScale = scaleTime()
    .domain(extent(monthlyData.map((datum) => xAccessor(datum))))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(monthlyData.map((datum) => yAccessor(datum))))
    .range([height, 0])
    .nice();

  return (
    <>
      <svg width={1200} height={600} style={{ position: "absolute" }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Channels
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            monthlyData={monthlyData}
            height={height}
            width={width}
          />
          <Marks
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            monthlyData={monthlyData}
            setShowTooltip={setShowTooltip}
            showTooltip={showTooltip}
          />
        </g>
      </svg>

      {showTooltip ? (
        <>
          <BarPlot
            width={900}
            height={450}
            innerRadius={50}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        </>
      ) : null}
    </>
  );
};

export default Line;
