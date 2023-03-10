import React from "react";
import { max } from "d3";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export const YGrids = ({ yScale, xScale, xAccessor, monthlyData, height }) => {
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
          />
          <text y={yScale(tick)} x="-18" style={{ fill: "white" }}>
            {tick}
          </text>
        </g>
      ))}
      <text
        style={{
          fill: "white",
          transform: `translate(-30px, ${height / 2 + 40}px) rotate(-90deg)`,
          fontSize: "1.5rem",
        }}
      >
        {"Temperature \u00B0 C"}
      </text>
    </>
  );
};
