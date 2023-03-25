import { useEffect, useState } from "react";
import { csv } from "d3";
import { useFormatter } from "./useFormatter";

const fetchLink = async (link, dataSetter) => {
  const data = await csv(link);

  dataSetter(data);
};

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchLink(
      "https://gist.githubusercontent.com/the-general-lee/5b6cdc81e758aeb63af3d2e4d5308351/raw/5aeb561c921b7220ef6e84c33a8084864dd72e71/TemperatureDataEgypt2022-2023.csv",
      setData
    );
  }, []);

  const [dailyData, monthlyData] = useFormatter(data);
  if (dailyData === null || monthlyData === null) {
    return;
  }

  return [dailyData, monthlyData];
};
