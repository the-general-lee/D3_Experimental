import React from "react";
import { min, max, median } from "d3";

export const CircularLabels = ({
  xScale,
  xAccessor,
  yScale,
  yAccessor,
  currentMonthData,
  width,
  height,
}) => {
  return (
    <>
      {currentMonthData.map((datum) => (
        <g>
          <g
            transform={
              "rotate(" +
              ((-(xScale(xAccessor(datum)) + xScale.bandwidth() / 2) * 180) /
                Math.PI -
                90) +
              ")" +
              "translate(" +
              (yScale(yAccessor(datum)) + 10) +
              ",0)" +
              `scale(${width / 1200},${height / 600})`
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
                (xScale(xAccessor(datum)) + xScale.bandwidth() / 2 + Math.PI) %
                  (2 * Math.PI) <
                Math.PI
                  ? "rotate(0)"
                  : "rotate(180)"
              }
              alignmentBaseline={"center"}
              fill="#7EE8FA"
            >{`day ${xAccessor(datum)}`}</text>
          </g>
        </g>
      ))}
    </>
  );
};
export const CentralLabels = ({
  yAccessor,
  currentMonthData,
  width,
  height,
  innerRadius,
}) => {
  return (
    <>
      <text
        fill="#7EE8FA"
        transform={`translate(-${0.8125 * innerRadius},-${
          0.25 * innerRadius
        })scale(${width / 1200},${height / 600})`}
      >
        <tspan x="0">{`min T \u00B0C: `}</tspan>
        <tspan x="0" dy="1.2em">{`${min(
          currentMonthData.map(
            (datum) => Math.round(yAccessor(datum) * 10) / 10
          )
        )}`}</tspan>
      </text>
      <text
        fill="#7EE8FA"
        transform={`translate(${0.15 * innerRadius},-${
          0.25 * innerRadius
        })scale(${width / 1200},${height / 600})`}
      >
        <tspan x="0">{`max T \u00B0C: `}</tspan>
        <tspan x="0" dy="1.2em">{`${max(
          currentMonthData.map(
            (datum) => Math.round(yAccessor(datum) * 10) / 10
          )
        )}`}</tspan>
      </text>
      <text
        fill="#7EE8FA"
        transform={`translate(-${0.3125 * innerRadius},${
          0.375 * innerRadius
        })scale(${width / 1200},${height / 600})`}
      >
        <tspan x="0">{`median T \u00B0C: `}</tspan>
        <tspan x="0" dy="1.2em">{`${median(
          currentMonthData.map(
            (datum) => Math.round(yAccessor(datum) * 10) / 10
          )
        )}`}</tspan>
      </text>
    </>
  );
};
