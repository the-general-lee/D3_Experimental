import React from "react";
import { scaleRadial, extent, scaleBand } from "d3";
import { useData } from "./helpers/useData";
import { LinearGrad } from "./components/Colors";
import { Marks } from "./components/Marks";
import { CentralLabels, CircularLabels } from "./components/circularPositions";
const margin = { top: 20, bottom: 40, right: 45, left: 80 };
const BarPlot = ({
  width = 1200,
  height = 600,
  innerRadius = 80,
  showTooltip,
  setShowTooltip,
}) => {
  const [data, monthlyData] = useData();
  const xOffset = showTooltip ? showTooltip.x + 220 : width / 2;
  const yOffset = showTooltip ? showTooltip.y + 140 : height / 2;
  if (data === undefined || monthlyData === undefined) {
    return;
  }

  const currentMonthData = showTooltip
    ? data.filter(
        (datum) =>
          datum.Date.getMonth() + 1 === showTooltip.monthInfo.month &&
          datum.Date.getFullYear() === showTooltip.monthInfo.year
      )
    : data.filter(
        (datum) =>
          datum.Date.getMonth() + 1 === 8 && datum.Date.getFullYear() === 2022
      ); // for April 2022
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const outerRadius = Math.min(innerWidth, innerHeight) / 2;

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
    <svg
      width={1200}
      height={600}
      style={{ position: "relative" }}
      onMouseDown={(event) => {
        setShowTooltip(undefined);
      }}
    >
      <LinearGrad
        xScale={xScale}
        xAccessor={xAccessor}
        currentMonthData={currentMonthData}
      />
      <g
        transform={`translate(${xOffset}, ${yOffset})scale(${width / 1200}, ${
          height / 600
        })`}
      >
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
          width={width}
          height={height}
        />
        <CentralLabels
          yAccessor={yAccessor}
          currentMonthData={currentMonthData}
          width={width}
          height={height}
          innerRadius={innerRadius}
        />
      </g>
    </svg>
  );
};

export default BarPlot;
