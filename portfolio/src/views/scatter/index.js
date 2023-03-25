import React, { useState } from "react";
import { scaleLinear, extent, scaleTime } from "d3";
import DropDown from "./components/DropDown/DropDown";
import { useData } from "./helpers/useData";
import { Marks } from "./components/Marks";
import { Channels } from "./components/Channels";
const margin = { top: 140, bottom: 100, right: 45, left: 220 };
const listMonths = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];
const listAttributes = [
  { label: "Temperature", value: "Avg Temp.", unit: "\u00B0 C" },
  { label: "Dew Point", value: "Avg Dew Point", unit: "\u00B0 F" },
  { label: "Humidity", value: "Avg Humidity", unit: "%" },
  { label: "Wind Speed", value: "Avg Wind Speed", unit: "mph" },
  { label: "Pressure", value: "Avg Pressure", unit: "in" },
];
const Scatter = () => {
  const [data, monthlyData] = useData();
  const [chosenMonth, setChosenMonth] = useState();
  const [chosenData, setChosenData] = useState();

  const currentMonthData =
    chosenMonth !== undefined
      ? data
          .filter(
            (datum) =>
              datum.Date.getMonth() === chosenMonth &&
              datum.Date.getFullYear() === 2022
          )
          .sort((a, b) => a.Date.getDate() - b.Date.getDate())
      : monthlyData;
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const xAccessor = (datum) => datum.Date;
  const yAccessor = (datum) =>
    chosenData ? datum[chosenData] : datum["Avg Temp."];

  const xScale = scaleTime()
    .domain(
      chosenMonth !== undefined
        ? extent(currentMonthData.map((datum) => xAccessor(datum)))
        : extent(monthlyData.map((datum) => xAccessor(datum)))
    )
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(
      chosenMonth !== undefined
        ? extent(currentMonthData.map((datum) => yAccessor(datum)))
        : extent(monthlyData.map((datum) => yAccessor(datum)))
    )
    .range([height, 0])
    .nice();
  const labels = chosenData
    ? listAttributes.find((attribute) => attribute.value === chosenData)
    : listAttributes[0];
  return (
    <>
      <svg width={1200} height={600} style={{ position: "absolute" }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Channels
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            monthlyData={currentMonthData}
            height={height}
            width={width}
            labels={labels}
          />
          <Marks
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            monthlyData={currentMonthData}
          />
        </g>
      </svg>
      <DropDown
        yOffset={80}
        xOffset={300}
        setChosenOption={setChosenMonth}
        listOptions={listMonths}
        dropDownTitle="Choose Month"
      />
      <DropDown
        yOffset={45}
        xOffset={900}
        setChosenOption={setChosenData}
        listOptions={listAttributes}
        dropDownTitle="Choose Attribute"
      />
    </>
  );
};

export default Scatter;
