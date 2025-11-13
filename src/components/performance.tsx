"use client";

import { Pie, PieChart } from "recharts";
import Image from "next/image";

// #region Sample data
const data = [
  { name: "Group A", value: 80, fill: "#0a5f59" },
  { name: "Group B", value: 20, fill: "#fdcf6f" },
];

const Performance = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  return (
    <div className="bg-white rounded-2xl border-1 border-gray-200 p-4 h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hiệu suất</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex items-center justify-center h-70">
        <PieChart width={380} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            isAnimationActive={isAnimationActive}
          />
        </PieChart>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">8.0</h1>
        <p className="text-xs text-gray-400">Trên thang điểm 10</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center ">
        01/01/2025 - 31/12/2025
      </h2>
    </div>
  );
};

export default Performance;
