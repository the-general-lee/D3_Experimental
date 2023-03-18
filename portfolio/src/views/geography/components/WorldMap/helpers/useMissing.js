import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
export const useMissing = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (d) => {
      d["Total Dead and Missing"] = +d["Total Dead and Missing"];
      d["Reported Date"] = new Date(d["Reported Date"]);
      d["coords"] = d["Location Coordinates"]
        .split(",")
        .map((coordinate) => +coordinate)
        .reverse();
      delete d["Location Coordinates"];
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
