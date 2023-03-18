import React, { useRef } from "react";
import WorldMap from "./components/WorldMap";

const width = 960;
const height = 500;

const Geography = () => {
  const svg = useRef();

  return (
    <svg
      ref={svg}
      width={width}
      height={height}
      transform={"translate(200,50)"}
    >
      <WorldMap svgRef={svg} />
    </svg>
  );
};
export default Geography;

/* import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography; */
