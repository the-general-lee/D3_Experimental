import { XGrids } from "./xPositions";
import { YGrids } from "./yPositions";

export const Channels = ({
  xScale,
  yScale,
  xAccessor,
  monthlyData,
  height,
  width,
  labels,
}) => {
  return (
    <>
      <YGrids
        xScale={xScale}
        yScale={yScale}
        xAccessor={xAccessor}
        monthlyData={monthlyData}
        height={height}
        labels={labels}
      />
      <XGrids xScale={xScale} height={height} width={width} />
    </>
  );
};
