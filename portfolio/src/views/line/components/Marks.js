import React, { useState } from "react";
import { line, curveNatural } from "d3";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export const Marks = ({
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  monthlyData,
}) => {
  const [showPoints, setShowPoints] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let timer = null;
  return (
    <>
      <path
        fill="none"
        stroke={colors.redAccent[500]}
        strokeWidth="5"
        d={line()
          .curve(curveNatural)
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d)))(monthlyData)}
        onMouseEnter={() => {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          setShowPoints(true);
        }}
        onMouseLeave={() => {
          timer = setTimeout(() => setShowPoints(false), 5000);
        }}
      />
      {showPoints
        ? monthlyData.map((datum) => (
            <circle
              cx={xScale(xAccessor(datum))}
              cy={yScale(yAccessor(datum))}
              r={7}
              fill={colors.redAccent[300]}
              onMouseEnter={() => {
                if (timer) {
                  clearTimeout(timer);
                  timer = null;
                }
                setShowPoints(true);
              }}
              onMouseLeave={() => {
                timer = setTimeout(() => setShowPoints(false), 5000);
              }}
            >
              <title>{Math.round(yAccessor(datum) * 10) / 10}</title>
            </circle>
          ))
        : null}
    </>
  );
};
