import React from "react";
import { timeFormat } from "d3";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export const XGrids = ({ xScale, height, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formattedTime = timeFormat("%e");
  return (
    <>
      {xScale.ticks().map((tick) => (
        <g>
          <line
            x1={xScale(tick)}
            y1="0"
            x2={xScale(tick)}
            y2={height}
            stroke={colors.grey[100]}
          />
          <text x={xScale(tick) - 5} y={height + 15} style={{ fill: "white" }}>
            {formattedTime(tick)}
          </text>
        </g>
      ))}
      <text
        x={width / 2 - 80}
        y={height + 40}
        style={{ fill: "white", fontSize: "1.5rem" }}
      >
        {"2022-2023"}
      </text>
    </>
  );
};
