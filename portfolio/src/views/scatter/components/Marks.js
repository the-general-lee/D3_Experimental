import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
export const Marks = ({
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  monthlyData,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {monthlyData.map((datum) => (
        <circle
          id={xAccessor(datum).getDate()}
          cx={xScale(xAccessor(datum))}
          cy={yScale(yAccessor(datum))}
          r={7}
          fill={colors.redAccent[300]}
          style={{ transition: "cx 1.5s, cy 1.5s" }}
        >
          <title>{Math.round(yAccessor(datum) * 10) / 10}</title>
        </circle>
      ))}
    </>
  );
};
