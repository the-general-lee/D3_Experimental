import React from "react";
import Marks from "./components/Marks";
import { useData } from "./helpers/useData";

export const WorldMap = ({ svgRef }) => {
  const data = useData();

  if (!data) {
    return;
  }
  return (
    <>
      <Marks data={data} svg={svgRef} />
    </>
  );
};
