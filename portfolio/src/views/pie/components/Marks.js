import React from "react";
import { arc } from "d3";

export const CircularBars = ({
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  datum,
  innerRadius,
}) => {
  return (
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
  );
};
export const Marks = ({
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  currentMonthData,
  innerRadius,
}) => {
  return (
    <>
      {currentMonthData.map((datum) => (
        <g>
          <CircularBars
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            datum={datum}
            innerRadius={innerRadius}
          />
          <title>{`${Math.round(yAccessor(datum) * 10) / 10}`}</title>
        </g>
      ))}
    </>
  );
};
