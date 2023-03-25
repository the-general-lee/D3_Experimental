import React from "react";
import Marks from "./components/Marks";
import { useData } from "./helpers/useData";

export const WorldMap = ({ data, filteredData }) => {
  const worldMapData = useData();

  if (!worldMapData) {
    return;
  }
  return (
    <>
      <Marks
        worldMapData={worldMapData}
        Missing={data}
        filteredMissing={filteredData}
      />
    </>
  );
};
