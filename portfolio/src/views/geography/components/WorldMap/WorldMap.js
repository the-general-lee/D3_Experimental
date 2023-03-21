import React from "react";
import Marks from "./components/Marks";
import { useData } from "./helpers/useData";

export const WorldMap = ({ svgRef, data }) => {
  const worldMapData = useData();

  if (!worldMapData) {
    return;
  }
  return (
    <>
      <Marks worldMapData={worldMapData} Missing={data} />
    </>
  );
};
