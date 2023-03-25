import React from "react";
import { max } from "d3";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export const YGrids = ({
  yScale,
  xScale,
  xAccessor,
  monthlyData,
  height,
  labels,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {yScale.ticks().map((tick) => (
        <g>
          <line
            x1="0"
            y1={yScale(tick)}
            x2={xScale(max(monthlyData.map((datum) => xAccessor(datum))))}
            y2={yScale(tick)}
            stroke={colors.grey[100]}
            style={{ transition: "y1 1s,y2 1s" }}
          />
          <text y={yScale(tick)} x="-30" style={{ fill: "white" }}>
            {tick}
          </text>
        </g>
      ))}
      <text
        style={{
          fill: "white",
          transform: `translate(-40px, ${height / 2 + 40}px) rotate(-90deg)`,
          fontSize: "1.5rem",
        }}
      >
        {labels.label + " " + labels.unit}
      </text>
    </>
  );
};
