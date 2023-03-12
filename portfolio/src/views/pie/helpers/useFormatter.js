import { groupBy } from "lodash";

const FahToCel = (degree) => {
  return (degree - 32) * (5 / 9);
};

export const useFormatter = (data) => {
  const dailyData = data?.map((datum, ind) => ({
    ...datum,
    Date: new Date(datum.Date),
    "Avg Temp.": FahToCel(+datum["Avg Temp."]),
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
  return [dailyData, monthlyData];
};
