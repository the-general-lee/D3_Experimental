import React, { useEffect, useState } from "react";
import {
  csv,
  scaleLinear,
  extent,
  scaleTime,
  max,
  timeFormat,
  line,
  curveNatural,
} from "d3";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { groupBy } from "lodash";
const fetchLink = async (link, dataSetter) => {
  const data = await csv(link);

  dataSetter(data);
};

const margin = { top: 20, bottom: 30, right: 45, left: 80 };

const Line = () => {
  const [data, setData] = useState(null);
  const [showPoints, setShowPoints] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    fetchLink(
      "https://gist.githubusercontent.com/the-general-lee/5b6cdc81e758aeb63af3d2e4d5308351/raw/5aeb561c921b7220ef6e84c33a8084864dd72e71/TemperatureDataEgypt2022-2023.csv",
      setData
    );
  }, []);

  if (data === null) {
    return;
  }
  /* now for d3 we need the scale functions to have the line chart we need  */
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const dailyData = data.map((datum, ind) => ({
    ...datum,
    Date: new Date(datum.Date),
    "Avg Temp.": +datum["Avg Temp."],
  }));

  let monthlyData = groupBy(
    dailyData,
    (datum) => `${datum.Date.getMonth() + 1}-${datum.Date.getFullYear()}`
  );

  monthlyData = Object.entries(monthlyData).map((object) => ({
    Date: object[1][object[1].length - 1].Date,
    "Avg Temp.": object[1].reduce(
      (average, day, index, array) => average + day["Avg Temp."] / array.length,
      0
    ),
  }));

  const xScale = scaleTime()
    .domain(extent(monthlyData.map((datum) => datum.Date)))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(monthlyData.map((datum) => datum["Avg Temp."])))
    .range([height, 0])
    .nice();

  const formattedTime = timeFormat("%B");

  /* the first part of the graph is working but now we found out we have too many data points because we tried to 
  show daily data for a one year period hence we can see that the graph didn't make sense*/

  /* now the monthyl data part is done we need the axes, it seems that axis don't 
  look too obvious when you do this kind of shit so a grid was formed instead but 
  axis can follow the same logic*/

  /*formatting is done using the simple <text> element now the only thing 
  remaining is applying the lines between the dots */

  /* After this we need to implement the functionality that the dots appear 
  only when you have hovered on the line for too long */
  /* the final thing before refactoring is implement a tooltip */
  /* this shit is ready time to refactor it */
  let timer = null;

  return (
    <svg width={1200} height={600}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {yScale.ticks().map((tick) => (
          <g>
            <line
              x1="0"
              y1={yScale(tick)}
              x2={xScale(max(monthlyData.map((datum) => datum.Date)))}
              y2={yScale(tick)}
              stroke={colors.grey[100]}
            />
            <text y={yScale(tick)} x="-18" style={{ fill: "white" }}>
              {tick}
            </text>
          </g>
        ))}
        {xScale.ticks().map((tick) => (
          <g>
            <line
              x1={xScale(tick)}
              y1="0"
              x2={xScale(tick)}
              y2={height}
              stroke={colors.grey[100]}
            />
            <text
              x={xScale(tick) - 15}
              y={height + 15}
              style={{ fill: "white" }}
            >
              {formattedTime(tick)}
            </text>
          </g>
        ))}
        <path
          fill="none"
          stroke={colors.redAccent[500]}
          strokeWidth="5"
          d={line()
            .curve(curveNatural)
            .x((d) => xScale(d.Date))
            .y((d) => yScale(d["Avg Temp."]))(monthlyData)}
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
                cx={xScale(datum.Date)}
                cy={yScale(datum["Avg Temp."])}
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
                <title>{datum["Avg Temp."]}</title>
              </circle>
            ))
          : null}

        {console.log("rendered")}
        <></>
      </g>
    </svg>
  );
};

export default Line;
