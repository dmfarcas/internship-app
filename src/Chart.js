import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Label,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data = null }) => {
  if (!data) return <></>;
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={400}
      data={data}
      //   margin={{
      //     top: 10,
      //     right: 30,
      //     left: 0,
      //     bottom: 0,
      //   }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="time" />
      {/* <YAxis>
        <Label value="Pages of my website" offset={0} position="insideBottom" />
      </YAxis> */}
      {/* <Tooltip /> */}
      <Area type="monotone" dataKey="temp_c" stroke="#ffcc00" fill="#fff5cc">
        <LabelList dataKey="temp_c" position="top" />
      </Area>
    </AreaChart>
    // </ResponsiveContainer>
  );
};

export default Chart;
