import { MainLayout } from "UI/MainLayout";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useEffect, useRef, useState } from "react";
import { FreezersChart } from "Components/superAdmin/Charts/FreezersChart";

const statistics = [
  {
    freezerName: "pana",
    freezerModel: "aloo",
    samplesCount: [
      {
        sampleType: "Blood samples",
        count: 73,
      },
      {
        sampleType: "Body fluids",
        count: 7,
      },
      {
        sampleType: "ABG’s sample",
        count: 0,
      },
      {
        sampleType: "24 hours urine collection",
        count: 0,
      },
      {
        sampleType: "Bone marrow",
        count: 0,
      },
      {
        sampleType: "Biopsy",
        count: 0,
      },
      {
        sampleType: "Sputum",
        count: 0,
      },
      {
        sampleType: "Spot urine",
        count: 0,
      },
      {
        sampleType: "CSF",
        count: 0,
      },
      {
        sampleType: "Stool",
        count: 0,
      },
      {
        sampleType: "Swaps",
        count: 0,
      },
    ],
  },
  {
    freezerName: "panad",
    freezerModel: "aloodd",
    samplesCount: [
      {
        sampleType: "Blood samples",
        count: 10,
      },
      {
        sampleType: "Body fluids",
        count: 0,
      },
      {
        sampleType: "ABG’s sample",
        count: 0,
      },
      {
        sampleType: "24 hours urine collection",
        count: 0,
      },
      {
        sampleType: "Bone marrow",
        count: 0,
      },
      {
        sampleType: "Biopsy",
        count: 0,
      },
      {
        sampleType: "Sputum",
        count: 0,
      },
      {
        sampleType: "Spot urine",
        count: 0,
      },
      {
        sampleType: "CSF",
        count: 0,
      },
      {
        sampleType: "Stool",
        count: 0,
      },
      {
        sampleType: "Swaps",
        count: 0,
      },
    ],
  },
  {
    freezerName: "panadasdf",
    freezerModel: "alooddasdf",
    samplesCount: [
      {
        sampleType: "Blood samples",
        count: 10,
      },
      {
        sampleType: "Body fluids",
        count: 500,
      },
      {
        sampleType: "ABG’s sample",
        count: 100,
      },
      {
        sampleType: "24 hours urine collection",
        count: 200,
      },
      {
        sampleType: "Bone marrow",
        count: 1000,
      },
      {
        sampleType: "Biopsy",
        count: 3000,
      },
      {
        sampleType: "Sputum",
        count: 2000,
      },
      {
        sampleType: "Spot urine",
        count: 0,
      },
      {
        sampleType: "CSF",
        count: 0,
      },
      {
        sampleType: "Stool",
        count: 3000,
      },
      {
        sampleType: "Swaps",
        count: 0,
      },
    ],
  },
];

export const Dashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSetting, setChartSetting] = useState({
    width: 200,
    height: 200,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        setChartSetting((prevSetting) => ({
          ...prevSetting,
          width: (chartRef.current?.clientWidth ?? 0) - 10 || prevSetting.width,
          height: chartRef.current?.clientHeight || prevSetting.height,
        }));
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Dashboard :</span>
          <div className="flex gap-2">
            <span className="font-bold text-xl pe-2"> Statistics By:</span>
          </div>
        </div>
        <div className="w-full h-full" ref={chartRef}>
          <FreezersChart chartSetting={chartSetting} statistics={statistics} />
        </div>
      </div>
    </MainLayout>
  );
};
