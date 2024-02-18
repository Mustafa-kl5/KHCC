import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useRef, useState } from "react";

export const FreezersChart = ({
  chartSetting,
  statistics,
}: {
  chartSetting: any;
  statistics: any;
}) => {
  const sampleTypes =
    statistics[0]?.samplesCount.map((sample: any) => ({
      id: sample.sampleType,
      sampleType: sample.sampleType,
    })) || [];

  // Converting statistics data to dataset format
  const dataset = statistics.map((stats: any) => {
    const initialAccumulator: { [key: string]: number } = {};
    return {
      freezers: `${stats.freezerName} - ${stats.freezerModel}`,
      ...stats.samplesCount.reduce((accumulator: any, current: any) => {
        accumulator[current.sampleType] = current.count;
        return accumulator;
      }, initialAccumulator),
    };
  });
  return (
    <BarChart
      margin={{ top: 10, bottom: 30, left: 60, right: 0 }}
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "freezers" }]}
      yAxis={[{ scaleType: "linear" }]} // Setting y-axis domain
      series={sampleTypes.map((sampleType: any) => ({
        dataKey: sampleType.sampleType,
        label: sampleType.sampleType,
        valueAccessor: (d: any) => d[sampleType.sampleType],
      }))}
      {...chartSetting}
    />
  );
};
