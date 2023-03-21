import React, { useEffect, useRef } from "react";
import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  select,
} from "d3";
import { AxisBottom } from "./components/AxisBottom";
import { AxisLeft } from "./components/AxisLeft";
import { Marks } from "./components/Marks";

const margin = { top: 0, right: 35, bottom: 15, left: 75 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

const BarChart = ({ width, height, data, setBrushExtent }) => {
  const brushRef = useRef();

  const brushed = (event) => {
    setBrushExtent(event.selection && event.selection.map(xScale.invert));
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  useEffect(() => {
    const brush = brushX()
      .on("brush", brushed)
      .extent([
        [0, 0],
        [innerWidth, innerHeight],
      ]);
    brush(select(brushRef.current));
  }, [innerHeight, innerWidth]);

  const xValue = (d) => d["Reported Date"];
  const xAxisLabel = "Time";

  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Total Dead and Missing";

  const xAxisTickFormat = timeFormat("%m/%d/%Y");

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0]);

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <AxisBottom
        xScale={xScale}
        innerHeight={innerHeight}
        tickFormat={xAxisTickFormat}
        tickOffset={5}
      />
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${
          innerHeight / 2 - 20
        }) rotate(-90)`}
      >
        {yAxisLabel}
      </text>
      <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
      >
        {xAxisLabel}
      </text>
      <Marks
        binnedData={binnedData}
        xScale={xScale}
        yScale={yScale}
        tooltipFormat={(d) => d}
        circleRadius={2}
        innerHeight={innerHeight}
      />
      <g ref={brushRef} />
    </g>
  );
};

export default BarChart;
