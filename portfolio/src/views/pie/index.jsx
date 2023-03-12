import React from "react";
import { scaleRadial, extent, scaleBand } from "d3";
import { useData } from "./helpers/useData";
import { LinearGrad } from "./components/Colors";
import { Marks } from "./components/Marks";
import { CentralLabels, CircularLabels } from "./components/circularPositions";
const margin = { top: 20, bottom: 40, right: 45, left: 80 };
const BarPlot = () => {
  const [data, monthlyData] = useData();

  if (data === undefined || monthlyData === undefined) {
    return;
  }

  const currentMonthData = data.filter(
    (datum) =>
      datum.Date.getMonth() + 1 === 8 && datum.Date.getFullYear() === 2022
  ); // for April 2022
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  const innerRadius = 80;
  const outerRadius = Math.min(width, height) / 2;

  const xAccessor = (datum) => datum?.Date?.getDate();
  const yAccessor = (datum) => datum["Avg Temp."];

  const xScale = scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(currentMonthData.map((datum) => datum.Date.getDate()));
  const yScale = scaleRadial()
    .domain(extent(currentMonthData.map((datum) => yAccessor(datum))))
    .range([innerRadius, outerRadius])
    .nice();

  return (
    <svg width={1200} height={600}>
      <LinearGrad
        xScale={xScale}
        xAccessor={xAccessor}
        currentMonthData={currentMonthData}
      />
      <g transform={`translate(620, 300)`}>
        <Marks
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          currentMonthData={currentMonthData}
          innerRadius={innerRadius}
        />
        <CircularLabels
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          currentMonthData={currentMonthData}
        />
        <CentralLabels
          yAccessor={yAccessor}
          currentMonthData={currentMonthData}
        />
      </g>
    </svg>
  );
};

export default BarPlot;
