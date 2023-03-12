import React from "react";

export const LinearGrad = ({ xScale, xAccessor, currentMonthData }) => {
  return (
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
  );
};
