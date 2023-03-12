import React from "react";
import { scaleRadial, extent, min, scaleBand, arc, max, median } from "d3";
import { useData } from "./helpers/useData";

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
      <defs>
        {currentMonthData.map((datum) => (
          <linearGradient
            id={`day${xAccessor(datum)}`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
            gradientTransform={
              "rotate(" +
              (-xScale(xAccessor(datum)) * 180) / Math.PI +
              " 0.5 0.5)"
            }
          >
            <stop offset="0%" stopColor="red" />

            <stop offset="100%" stopColor="yellow" />
          </linearGradient>
        ))}
      </defs>
      <g transform={`translate(620, 300)`}>
        {currentMonthData.map((datum) => (
          <g>
            <path
              fill={`url(#day${xAccessor(datum)})`}
              d={arc()
                .innerRadius(innerRadius)
                .outerRadius(yScale(yAccessor(datum)))
                .startAngle(-xScale(xAccessor(datum)) - xScale.bandwidth())
                .endAngle(-xScale(xAccessor(datum)))
                .padAngle(0.01)
                .padRadius(innerRadius)()}
            />
            <g
              transform={
                "rotate(" +
                ((-(xScale(xAccessor(datum)) + xScale.bandwidth() / 2) * 180) /
                  Math.PI -
                  90) +
                ")" +
                "translate(" +
                (yScale(yAccessor(datum)) + 10) +
                ",0)"
              }
              textAnchor={
                (xScale(xAccessor(datum)) + xScale.bandwidth() / 2 + Math.PI) %
                  (2 * Math.PI) <
                Math.PI
                  ? "start"
                  : "end"
              }
            >
              <text
                transform={
                  (xScale(xAccessor(datum)) +
                    xScale.bandwidth() / 2 +
                    Math.PI) %
                    (2 * Math.PI) <
                  Math.PI
                    ? "rotate(0)"
                    : "rotate(180)"
                }
                alignmentBaseline={"center"}
                fill="white"
              >{`day ${xAccessor(datum)}`}</text>
            </g>
            <title>{`${Math.round(yAccessor(datum) * 10) / 10}`}</title>
          </g>
        ))}
        <text fill="#7EE8FA" transform="translate(-65,-20)">
          <tspan x="0">{`min T \u00B0C: `}</tspan>
          <tspan x="0" dy="1.2em">{`${min(
            currentMonthData.map(
              (datum) => Math.round(yAccessor(datum) * 10) / 10
            )
          )}`}</tspan>
        </text>
        <text fill="#7EE8FA" transform="translate(15,-20)">
          <tspan x="0">{`max T \u00B0C: `}</tspan>
          <tspan x="0" dy="1.2em">{`${max(
            currentMonthData.map(
              (datum) => Math.round(yAccessor(datum) * 10) / 10
            )
          )}`}</tspan>
        </text>
        <text fill="#7EE8FA" transform="translate(-25,30)">
          <tspan x="0">{`median T \u00B0C: `}</tspan>
          <tspan x="0" dy="1.2em">{`${median(
            currentMonthData.map(
              (datum) => Math.round(yAccessor(datum) * 10) / 10
            )
          )}`}</tspan>
        </text>
      </g>
    </svg>
  );
};

export default BarPlot;

/* import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie; */
